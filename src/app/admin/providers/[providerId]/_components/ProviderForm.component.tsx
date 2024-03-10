"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
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
  providerPriorityValues,
} from "~/server/db/schema";
import { api } from "~/trpc/react";

const leadDeliveryMethodOptions = leadDeliveryMethodValues.map((method) => ({
  label: method,
  value: method,
}));

const providerPriorityOptions = providerPriorityValues.map((priority) => ({
  label: priority,
  value: priority,
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
    getValues,
    setValue,
    control,
    watch,
  } = useForm<ProviderEditValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(insertProviderSchema),
  });

  const { data: services } = api.service.getAll.useQuery();

  return (
    <Page backAction={{ url: backUrl }} title={pageTitle}>
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
            name="priority"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <Select
                  label="Priority"
                  options={providerPriorityOptions}
                  {...rest}
                  error={errors.priority?.message}
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

          <Controller
            name="serviceId"
            control={control}
            render={({ field }) => {
              const { ref, value, ...rest } = field;
              return (
                <Select
                  label="Service"
                  options={
                    services?.map((service) => ({
                      label: service.name,
                      value: service.id.toString(),
                    })) || []
                  }
                  value={value?.toString()}
                  {...rest}
                  error={errors.leadDeliveryMethod?.message}
                />
              );
            }}
          />

          <Checkbox
            label="Archived"
            checked={getValues("archived")}
            onChange={(newChecked) => setValue("archived", newChecked)}
            error={errors.archived?.message}
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
