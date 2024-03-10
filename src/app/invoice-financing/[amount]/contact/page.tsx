"use client";
import Button from "~/app/_components/Button.component";
import Input from "~/app/_components/Input.component";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { sendGTMEvent } from "@next/third-parties/google";
import useInvoiceFinancing, {
  PageEnum,
} from "~/app/_hooks/useInvoiceFinancing";

const inputsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email().min(1, "Email is required"),
  phoneNumber: z.coerce
    .number({
      invalid_type_error: "Phone number must be a number without spaces",
    })
    .int()
    .min(1, "Phone number is required"),
});

type Inputs = z.infer<typeof inputsSchema>;

export default function Contact({
  params: { amount },
}: {
  params: { amount: string };
}) {
  const { data: values, clear } = useInvoiceFinancing(
    PageEnum.Contact,
    parseInt(amount),
  );
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      fullName: values.fullName ?? "",
    },
    resolver: zodResolver(inputsSchema),
  });

  const { mutate: postLead, isLoading } = api.lead.post.useMutation({
    onSuccess: ({ error }) => {
      clear();

      if (!error) {
        navigate.push("thank-you");
      } else if (error === "No provider found") {
        navigate.push("pending");
      } else {
        navigate.push("error");
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (
      !values.companyName ??
      !values.turnoverId ??
      !values.industryId ??
      !values.tenureId
    ) {
      alert("Please fill out the previous forms");
      return;
    }

    postLead({
      annualTurnoverGBPId: values.turnoverId,
      companyName: values.companyName || "ERROR",
      email: data.email,
      fullName: data.fullName,
      industryId: values.industryId,
      phoneNumber: data.phoneNumber.toString(),
      tenureYrsId: values.tenureId,
      address: values.address,
      companyStatus: values.companyStatus,
      companyType: values.companyType,
      postalCode: values.postalCode,
      amountGBP: parseInt(amount),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <h2 className="mb-8 text-center text-lg text-primary">
        Tell us about yourself
      </h2>
      <Input
        id={"full-name"}
        label={"Full name"}
        placeholder="Jane Smith"
        required
        register={register("fullName", { required: true })}
        disabled={!!values.fullName}
        error={errors.fullName?.message}
      />
      <Input
        id={"phone-number"}
        type="tel"
        label={"Phone number"}
        placeholder="07400 123456"
        required
        register={register("phoneNumber", { required: true })}
        error={errors.phoneNumber?.message}
      />
      <Input
        id={"email"}
        type="email"
        label="Email"
        placeholder="contact@contact.com"
        required
        register={register("email", { required: true })}
        error={errors.email?.message}
      />

      <p className="text-center">
        By filling out this form you agree to our{" "}
        <a
          href="http://mybusinessguide.co.uk/customer-terms"
          target="_blank"
          onClick={() =>
            sendGTMEvent({
              event: "invoice_finance_contact_terms",
              value: "invoice_finance_contact_terms",
            })
          }
          className="underline"
        >
          terms of business
        </a>{" "}
        and our{" "}
        <a
          href="http://mybusinessguide.co.uk/privacy-policy"
          target="_blank"
          onClick={() =>
            sendGTMEvent({
              event: "invoice_finance_contact_privacy",
              value: "invoice_finance_contact_privacy",
            })
          }
          className="underline"
        >
          privacy policy
        </a>
      </p>

      <Button
        type="submit"
        onClick={() =>
          sendGTMEvent({
            event: "invoice_finance_find_expert",
            value: "invoice_finance_find_expert",
          })
        }
        loading={isLoading}
      >
        Find Expert
      </Button>
    </form>
  );
}
