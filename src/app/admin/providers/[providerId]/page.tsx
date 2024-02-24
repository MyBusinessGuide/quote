"use client";
import {
  Layout,
  Page,
  Text,
  Card,
  BlockStack,
  DescriptionList,
  Modal,
} from "@shopify/polaris";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

type ProviderParams = { params: { providerId: string } };

export default function Provider({ params: { providerId } }: ProviderParams) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { mutate: deleteProvider, isLoading: isLoadingDeleteProvider } =
    api.provider.delete.useMutation({
      onSuccess: () => {
        router.push("/admin/providers");
      },
    });
  const [data] = api.provider.get.useSuspenseQuery(
    { id: Number(providerId) },
    {
      useErrorBoundary: true,
    },
  );

  return (
    <Page
      backAction={{ content: "Back", url: "/admin/providers" }}
      title={`Provider - ${data.companyName}`}
      // subtitle="Provider from: December 2021"
      secondaryActions={[
        { content: "Edit", url: `/admin/providers/${providerId}/edit` },
        {
          content: "Delete",
          onAction: () => setDeleteModalOpen(true),
          destructive: true,
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="025">
            <Text id="storeDetails" variant="headingMd" as="h2">
              Provider details
            </Text>
            <Text tone="subdued" as="p">
              These are the detials of the provider. You can edit or delete them
              by using the buttons in the top right.
            </Text>
          </BlockStack>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <DescriptionList
              items={[
                {
                  term: "Company Name",
                  description: data.companyName,
                },
                {
                  term: "Company Number",
                  description: data.companyNumber,
                },
                {
                  term: "Contact Name",
                  description: data.contactName,
                },
                {
                  term: "Email",
                  description: data.email,
                },
                {
                  term: "Phone Number",
                  description: data.phoneNumber,
                },
                {
                  term: "Address",
                  description: data.address,
                },
                {
                  term: "Max Monthly Budget (GBP)",
                  description: data.maxMonthlyBudgetGBP,
                },
                {
                  term: "Lead Delivery Method",
                  description: data.leadDeliveryMethod,
                },
                {
                  term: "FCA Number",
                  description: data.fcaNumber,
                },
              ]}
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <BlockStack gap="025">
            <Text id="storeDetails" variant="headingMd" as="h2">
              Leads
            </Text>
            <Text tone="subdued" as="p">
              These are the leads that have been connected with this provider.
            </Text>
          </BlockStack>
        </Layout.Section>
        <Layout.Section>
          <Card></Card>
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
            deleteProvider({ id: Number(providerId) });
          },
          loading: isLoadingDeleteProvider,
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
    </Page>
  );
}
