"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormLayout,
  Page,
  PageActions,
  Select,
} from "@shopify/polaris";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";

const connectSchema = z.object({
  leadId: z.coerce.number().min(1),
  providerBidId: z.coerce.number().min(1, "Please select a provider bid"),
});

type ConnectFormValues = z.infer<typeof connectSchema>;

export default function ConnectLeadToProvider({
  params: { leadId },
}: {
  params: { leadId: string };
}) {
  const defaultValues: ConnectFormValues = useMemo(
    () => ({
      leadId: Number(leadId),
      providerBidId: -1,
    }),
    [leadId],
  );

  const router = useRouter();
  const [lead] = api.lead.get.useSuspenseQuery({ id: Number(leadId) });
  const [providers] = api.provider.getAll.useSuspenseQuery();
  const [selectedProviderId, setSelectedProviderId] = useState<
    number | undefined
  >(providers[0]?.id);
  const { data: providerBids, isLoading: isLoadingProviderBids } =
    api.providerBid.getAllWhereProvider.useQuery(
      {
        providerId: selectedProviderId!,
        leadId: Number(leadId),
      },
      {
        onSuccess: (data) => {
          if (data.length > 0) {
            setValue("providerBidId", data[0]!.id);
          } else {
            setValue("providerBidId", -1);
          }
        },
        enabled: selectedProviderId !== undefined && selectedProviderId !== -1,
        refetchOnWindowFocus: false,
      },
    );

  const { mutate: connect, isLoading: isLoadingConnect } =
    api.lead.connect.useMutation({
      onSuccess: () => {
        router.push(`/admin/leads/${leadId}`);
      },
    });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<ConnectFormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(connectSchema),
  });

  return (
    <Page
      backAction={{
        content: "Back",
        url: `/admin/leads/${leadId}`,
      }}
      title={`Connect lead to provider`}
      subtitle={`${lead.user.name} from ${lead.lead.companyName} - ${lead.lead.leadCode}`}
    >
      <Form onSubmit={handleSubmit((values) => connect(values))}>
        <FormLayout>
          <Select
            label="Provider"
            options={
              providers.map((provider, i) => ({
                label: `${provider.companyName}`,
                value: provider.id.toString(),
                key: provider.id.toString() + i,
              })) || []
            }
            value={selectedProviderId?.toString() || ""}
            onChange={(value) => {
              setSelectedProviderId(Number(value));
            }}
          />

          <Controller
            name="providerBidId"
            control={control}
            render={({ field }) => {
              const { ref, value, ...rest } = field;
              return (
                <Select
                  label="Provider bid"
                  options={
                    providerBids?.map((providerBid, i) => ({
                      label: `${providerBid.leadCode} - £${providerBid.amountGBP}`,
                      value: providerBid.id.toString(),
                      key: providerBid.id.toString() + i,
                    })) || []
                  }
                  value={value.toString()}
                  {...rest}
                  error={errors.providerBidId?.message}
                  disabled={isLoadingProviderBids || !selectedProviderId}
                />
              );
            }}
          />
          {providerBids?.length === 0 && <div>No providers found</div>}
        </FormLayout>
        <PageActions
          primaryAction={
            <Button submit loading={isLoadingConnect} variant="primary">
              Save
            </Button>
          }
          secondaryActions={[
            {
              content: "Cancel",
              url: `/admin/leads/${leadId}`,
              destructive: true,
            },
          ]}
        />
      </Form>
    </Page>
  );
}
