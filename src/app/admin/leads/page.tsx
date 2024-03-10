"use client";

import {
  Badge,
  BlockStack,
  Card,
  InlineGrid,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Text,
} from "@shopify/polaris";
import { api } from "~/trpc/react";

export default function Leads() {
  const [data] = api.lead.getAll.useSuspenseQuery();

  return (
    <Page title="Leads">
      <Layout>
        <Layout.Section>
          <Card padding={"0"}>
            <ResourceList
              resourceName={{ singular: "customer", plural: "customers" }}
              items={data}
              renderItem={(item) => {
                const {
                  lead: { id, companyName, leadCode, dateCreated },
                  user: { name },
                  lead_provider_connection: isConnected,
                } = item;

                return (
                  <ResourceItem id={id.toString()} url={`/admin/leads/${id}`}>
                    <InlineGrid columns="1fr auto">
                      <div>
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                          {companyName} - {leadCode}
                        </Text>
                        <div>{name}</div>
                      </div>
                      <BlockStack align="space-between">
                        {!!isConnected ? (
                          <Badge tone="success">Connected</Badge>
                        ) : (
                          <Badge tone="critical">Not connected</Badge>
                        )}
                        {dateCreated && (
                          <Text variant="bodySm" as={"p"}>
                            {dateCreated.toDateString()}
                          </Text>
                        )}
                      </BlockStack>
                    </InlineGrid>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
