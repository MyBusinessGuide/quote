"use client";
import {
  Layout,
  Page,
  Text,
  Card,
  BlockStack,
  DescriptionList,
  Modal,
  DataTable,
  Box,
  Button,
  ButtonGroup,
  InlineGrid,
} from "@shopify/polaris";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { api } from "~/trpc/react";
import ProviderBids from "./_components/ProviderBids.component";
import Link from "next/link";
import ReportTable from "./_components/ReportTable.component";
import ReportTableCard from "./_components/ReportTableCard.component";

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
              Details
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
                {
                  term: "Priority",
                  description: data.priority,
                },
              ]}
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <InlineGrid columns="1fr auto">
            <BlockStack gap="025">
              <Text id="storeDetails" variant="headingMd" as="h2">
                Bids
              </Text>
              <Text tone="subdued" as="p">
                These are the providers bids and their connected leads.
              </Text>
            </BlockStack>
            <ButtonGroup>
              <Link href={`/admin/providers/${providerId}/bid/create`}>
                <Button>Add</Button>
              </Link>
            </ButtonGroup>
          </InlineGrid>
        </Layout.Section>

        <Suspense fallback={<Layout.Section>Loading...</Layout.Section>}>
          <ProviderBids providerId={Number(providerId)} />
        </Suspense>

        <Layout.Section>
          <BlockStack gap="025">
            <Text id="storeDetails" variant="headingMd" as="h2">
              Report
            </Text>
          </BlockStack>
        </Layout.Section>

        <ReportTableCard providerId={providerId} />
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

      <Box paddingBlock="1000" />
    </Page>
  );
}
