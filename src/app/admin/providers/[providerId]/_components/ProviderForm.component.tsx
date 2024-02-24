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
import {
  insertProviderSchema,
  leadDeliveryMethodValues,
} from "~/server/db/schema";

const leadDeliveryMethodOptions = leadDeliveryMethodValues.map((method) => ({
  label: method,
  value: method,
}));

type ProviderEditValues = z.infer<typeof insertProviderSchema>;

type ProviderFormProps = {
  onSubmit: SubmitHandler<ProviderEditValues>;
  defaultValues: ProviderEditValues;
  pageTitle: string;
  backUrl: string;
  isLoading?: boolean;
};

export default function ProviderForm({
  defaultValues,
  onSubmit,
  pageTitle,
  backUrl,
  isLoading,
}: ProviderFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProviderEditValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(insertProviderSchema),
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
              const { ref, value, ...rest } = field;
              return (
                <TextField
                  autoComplete="off"
                  label="Company Number"
                  value={field.value || ""}
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
              const { ref, value, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  label="Phone number"
                  value={field.value || ""}
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
              const { ref, value, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  label="Address"
                  value={field.value || ""}
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
              const { ref, value, ...rest } = field;
              return (
                <TextField
                  autoComplete="on"
                  label="FCA number"
                  value={field.value || ""}
                  {...rest}
                  error={errors.fcaNumber?.message}
                />
              );
            }}
          />
        </FormLayout>
        <PageActions
          primaryAction={
            <Button submit loading={isLoading} variant="primary">
              Save
            </Button>
          }
          secondaryActions={[
            {
              content: "Cancel",
              url: backUrl,
              destructive: true,
            },
          ]}
        />
      </Form>
    </Page>
  );
}
