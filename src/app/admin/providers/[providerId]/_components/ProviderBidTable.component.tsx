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
} from "@shopify/polaris";
import ConnectProviderLeadModal from "./ConnectProviderLeadModal.component";
import { api as apiServer } from "~/trpc/server";
import { Info } from "lucide-react";
import { useState } from "react";

type ProviderBidTableProps = Awaited<
  ReturnType<typeof apiServer.provider.getProviderBids.query>
>[0];

export default function ProviderBidTable({
  leads,
  providerBid,
}: ProviderBidTableProps) {
  const [connectProviderBidLeadOpen, setConnectProviderBidLeadOpen] =
    useState(false);
  return (
    <Layout.Section>
      <Card>
        <BlockStack gap="025">
          <InlineGrid columns="1fr auto" alignItems="center">
            <Text id="providerTitle" variant="headingMd" as="h3">
              Bid for {providerBid.leadCode} - {providerBid.amountGBP} GBP{" "}
              <Info size={12} />
            </Text>

            <ButtonGroup>
              <Button variant="monochromePlain">Edit</Button>
              <Button tone="critical" variant="plain">
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
    </Layout.Section>
  );
}
