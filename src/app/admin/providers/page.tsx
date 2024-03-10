"use client";

import {
  Badge,
  Card,
  InlineGrid,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Text,
} from "@shopify/polaris";
import { arch } from "os";
import { api } from "~/trpc/react";

export default function Providers() {
  const [data] = api.provider.getAll.useSuspenseQuery();

  return (
    <Page
      title="Providers"
      primaryAction={{
        content: "Create provider",
        url: "/admin/providers/create",
      }}
    >
      <Layout>
        <Layout.Section>
          <Card padding={"0"}>
            <ResourceList
              resourceName={{ singular: "customer", plural: "customers" }}
              items={data}
              renderItem={(item) => {
                const { id, companyName, companyNumber, archived } = item;
                const description = companyNumber
                  ? `Company number - ${companyNumber}`
                  : "No company number";

                return (
                  <ResourceItem
                    id={id.toString()}
                    url={`/admin/providers/${id}`}
                  >
                    <InlineGrid columns="1fr auto">
                      <div>
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                          {companyName}
                        </Text>
                        <div>{description}</div>
                      </div>
                      <div>
                        {archived && <Badge tone="critical">Archived</Badge>}
                      </div>
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
