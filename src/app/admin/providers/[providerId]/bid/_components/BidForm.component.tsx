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
import { insertProviderBidSchema, leadCodeValues } from "~/server/db/schema";

type BidFormValues = z.infer<typeof insertProviderBidSchema>;

type BidFormProps = {
  onSubmit: SubmitHandler<BidFormValues>;
  defaultValues: BidFormValues;
  pageTitle: string;
  isLoading?: boolean;
  backUrl: string;
};

export default function BidForm({
  defaultValues,
  onSubmit,
  pageTitle,
  isLoading,
  backUrl,
}: BidFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BidFormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(insertProviderBidSchema),
  });

  return (
    <Page title={pageTitle} backAction={{ url: backUrl }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          <Controller
            name="amountGBP"
            control={control}
            render={({ field }) => {
              const { ref, value, ...rest } = field;
              return (
                <TextField
                  autoComplete="off"
                  label="Bid amount (GBP)"
                  prefix="£"
                  type="number"
                  value={value.toString()}
                  {...rest}
                  error={errors.amountGBP?.message}
                />
              );
            }}
          />

          <Controller
            name="leadCode"
            control={control}
            render={({ field }) => {
              const { ref, ...rest } = field;
              return (
                <Select
                  label="Lead code"
                  options={leadCodeValues.map((leadCode) => ({
                    label: leadCode,
                    value: leadCode,
                  }))}
                  {...rest}
                  error={errors.leadCode?.message}
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
