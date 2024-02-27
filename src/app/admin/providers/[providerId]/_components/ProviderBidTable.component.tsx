import {
  Text,
  Card,
  BlockStack,
  InlineGrid,
  ButtonGroup,
  Button,
  DataTable,
  Layout,
  Box,
  Modal,
} from "@shopify/polaris";
import ConnectProviderLeadModal from "./ConnectProviderLeadModal.component";
import { api as apiServer } from "~/trpc/server";
import { useState } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";

type ProviderBidTableProps = Awaited<
  ReturnType<typeof apiServer.provider.getProviderBids.query>
>[0];

export default function ProviderBidTable({
  leads,
  providerBid,
}: ProviderBidTableProps) {
  const [connectProviderBidLeadOpen, setConnectProviderBidLeadOpen] =
    useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const utils = api.useUtils();
  const { mutate: deleteProviderBid, isLoading: isLoadingDeleteProviderBid } =
    api.providerBid.delete.useMutation({
      onSuccess: () => {
        setDeleteModalOpen(false);
        utils.provider.getProviderBids.invalidate({
          id: Number(providerBid.providerId),
        });
      },
    });

  return (
    <Layout.Section>
      <Card>
        <BlockStack gap="025">
          <InlineGrid columns="1fr auto" alignItems="center">
            <Text id="providerTitle" variant="headingMd" as="h3">
              Bid for {providerBid.leadCode} - {providerBid.amountGBP} GBP
            </Text>

            <ButtonGroup>
              <Link
                href={`/admin/providers/${providerBid.providerId}/bid/${providerBid.id}/edit`}
              >
                <Button variant="monochromePlain">Edit</Button>
              </Link>
              <Button
                tone="critical"
                variant="plain"
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                onClick={() => setConnectProviderBidLeadOpen(true)}
              >
                Connect lead
              </Button>
            </ButtonGroup>
          </InlineGrid>
        </BlockStack>

        {leads.length === 0 ? (
          <Text as="p">No leads</Text>
        ) : (
          <Box paddingBlockStart="200">
            <BlockStack gap="200">
              <Card padding="0">
                <DataTable
                  columnContentTypes={["text", "text", "text"]}
                  headings={["Lead company", "Bid amount", "Actions"]}
                  rows={leads.map((lead) => [
                    lead.companyName,
                    lead.amountGBP || "ERROR", // replace
                    <Button variant="plain">View</Button>,
                  ])}
                />
              </Card>
            </BlockStack>
          </Box>
        )}
      </Card>
      <ConnectProviderLeadModal
        open={connectProviderBidLeadOpen}
        onClose={() => setConnectProviderBidLeadOpen(false)}
        leadCode={providerBid.leadCode}
        providerBid={{
          id: providerBid.id,
          label: `Bid for ${providerBid.leadCode}`,
        }}
      />

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Are you sure you want to delete this provider bid?"
        primaryAction={{
          content: "Delete",
          destructive: true,
          onAction: () => {
            deleteProviderBid({ providerBidId: Number(providerBid.id) });
          },
          loading: isLoadingDeleteProviderBid,
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
    </Layout.Section>
  );
}
