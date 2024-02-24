import {
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  DataTable,
  InlineGrid,
  InlineStack,
  Layout,
  Text,
} from "@shopify/polaris";
import { Info } from "lucide-react";
import { api } from "~/trpc/react";

type ProviderBidsProps = {
  providerId: number;
};

export default function ProviderBids({ providerId }: ProviderBidsProps) {
  const [providerBids] = api.provider.getProviderBids.useSuspenseQuery({
    id: Number(providerId),
  });

  if (providerBids.length === 0) {
    return <Layout.Section>No leads found</Layout.Section>;
  }

  return providerBids.map(({ providerBid, leads }) => {
    return (
      <Layout.Section key={providerBid.id}>
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
                <Button variant="secondary">Connect lead</Button>
              </ButtonGroup>
            </InlineGrid>
          </BlockStack>

          <Box paddingBlockStart="200">
            <BlockStack gap="200">
              <Card padding="0">
                <DataTable
                  columnContentTypes={["text", "text", "text"]}
                  headings={["Lead company", "Bid amount", "Actions"]}
                  rows={leads.map((lead) => [
                    lead.lead.companyName,
                    lead.lead.amountGBP || "ERROR", // replace
                    <Button variant="plain">View</Button>,
                  ])}
                />
              </Card>
            </BlockStack>
          </Box>
        </Card>
      </Layout.Section>
    );
  });
}
