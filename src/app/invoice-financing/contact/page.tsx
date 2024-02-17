"use client";
import Button from "~/app/_components/Button.component";
import Input from "~/app/_components/Input.component";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import useInvoiceFinancing from "~/app/_hooks/useInvoiceFinancing";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

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

export default function Contact() {
  const { values, clear } = useInvoiceFinancing();
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
    onSuccess: () => {
      clear();
      navigate.push("thank-you");
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
        <span className="underline">terms of business</span> and our{" "}
        <span className="underline">privacy policy</span>
      </p>

      <Button type="submit" loading={isLoading}>
        Find Expert
      </Button>
    </form>
  );
}
