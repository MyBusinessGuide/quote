"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormLayout,
  Page,
  PageActions,
  Select,
  TextField,
} from "@shopify/polaris";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { leadDeliveryMethodValues } from "~/server/db/schema";
import { provider } from "../page";

const leadDeliveryMethodOptions = leadDeliveryMethodValues.map((method) => ({
  label: method,
  value: method,
}));

const ProviderEditSchema = z.object({
  companyName: z.string(),
  companyNumber: z.string(),
  contactName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  maxMonthlyBudgetGBP: z.number(),
  leadDeliveryMethod: z.enum(leadDeliveryMethodValues),
  fcaNumber: z.string(),
});

type ProviderEditValues = z.infer<typeof ProviderEditSchema>;

type ProviderFormProps = {
  onSubmit: SubmitHandler<ProviderEditValues>;
  defaultValues: ProviderEditValues;
  pageTitle: string;
};

export default function ProviderForm({
  defaultValues,
  onSubmit,
  pageTitle,
}: ProviderFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProviderEditValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(ProviderEditSchema),
  });

  return (
    <Page backAction={{ url: "" }} title={pageTitle}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <TextField
                  autoComplete="off"
                  label="Company Name"
                  {...rest}
                  error={errors.companyName?.message}
                />
              );
            }}
          />

          <Controller
            name="companyNumber"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <TextField
                  autoComplete="off"
                  label="Company Number"
                  {...rest}
                  error={errors.companyNumber?.message}
                />
              );
            }}
          />

          <Controller
            name="contactName"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  label="Contact name"
                  {...rest}
                  error={errors.contactName?.message}
                />
              );
            }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  label="Email"
                  {...rest}
                  error={errors.email?.message}
                />
              );
            }}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  label="Phone number"
                  {...rest}
                  error={errors.phoneNumber?.message}
                />
              );
            }}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  label="Address"
                  {...rest}
                  error={errors.address?.message}
                />
              );
            }}
          />
          <Controller
            name="maxMonthlyBudgetGBP"
            control={control}
            render={({ field }) => {
              const { ref, value, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  type="number"
                  label="Max monthly budget (GBP)"
                  prefix="£"
                  value={field.value.toString()}
                  {...rest}
                  error={errors.maxMonthlyBudgetGBP?.message}
                />
              );
            }}
          />
          <Controller
            name="leadDeliveryMethod"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <Select
                  label="Lead delivery method"
                  options={leadDeliveryMethodOptions}
                  {...rest}
                  error={errors.leadDeliveryMethod?.message}
                />
              );
            }}
          />
          <Controller
            name="fcaNumber"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  label="FCA number"
                  {...rest}
                  error={errors.fcaNumber?.message}
                />
              );
            }}
          />
        </FormLayout>
        <PageActions
          primaryAction={
            <Button submit variant="primary">
              Save
            </Button>
          }
          secondaryActions={[
            {
              content: "Cancel",
              onAction: () => console.log("Cancel"),
              destructive: true,
            },
          ]}
        />
      </Form>
    </Page>
  );
}
