"use client";
import {
  Layout,
  Page,
  Text,
  Card,
  BlockStack,
  DescriptionList,
  Modal,
  Box,
} from "@shopify/polaris";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { api } from "~/trpc/react";

type ProviderParams = { params: { leadId: string } };

export default function Provider({ params: { leadId } }: ProviderParams) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const utils = api.useUtils();
  const { mutate: deleteLead, isLoading: isLoadingDeleteLead } =
    api.lead.delete.useMutation({
      onSuccess: async () => {
        router.push("/admin/leads");
        await utils.lead.getAll.invalidate();
      },
    });
  const [data] = api.lead.get.useSuspenseQuery(
    { id: Number(leadId) },
    {
      useErrorBoundary: true,
    },
  );

  return (
    <Page
      backAction={{ content: "Back", url: "/admin/leads" }}
      title={`Lead - ${data.user.name} from ${data.lead.companyName} - ${data.lead.leadCode}`}
      subtitle={
        data.providerBid?.amountGBP
          ? `Loan amount - £${data.providerBid.amountGBP}`
          : "Not connected"
      }
      primaryAction={{
        content: data.provider ? "View provider" : "Connect with provider",
        url: data.provider
          ? `/admin/providers/${data.provider.id}`
          : `/admin/leads/${leadId}/connect`,
      }}
      secondaryActions={[
        {
          content: "Delete",
          onAction: () => setDeleteModalOpen(true),
          destructive: true,
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="300">
            <Text id="storeDetails" variant="headingMd" as="h2">
              Lead details
            </Text>
            <Card>
              <DescriptionList
                items={Object.entries(data.lead).map(([key, value]) => ({
                  term: key,
                  description: value || "-",
                }))}
              />
            </Card>
          </BlockStack>
        </Layout.Section>

        <Layout.Section>
          <BlockStack gap="300">
            <Text id="storeDetails" variant="headingMd" as="h2">
              User details
            </Text>
            <Card>
              <DescriptionList
                items={Object.entries(data.user).map(([key, value]) => ({
                  term: key,
                  description: value || "-",
                }))}
              />
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Are you sure you want to delete this provider?"
        primaryAction={{
          content: "Delete",
          destructive: true,
          onAction: () => {
            deleteLead({ id: Number(leadId) });
          },
          loading: isLoadingDeleteLead,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setDeleteModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <p>This action cannot be undone.</p>
        </Modal.Section>
      </Modal>

      <Box paddingBlock="400" />
    </Page>
  );
}
