"use client";

import {
  Card,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Text,
} from "@shopify/polaris";
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
                const { id, companyName, companyNumber } = item;
                const description = companyNumber
                  ? `Company number - ${companyNumber}`
                  : "No company number";

                return (
                  <ResourceItem
                    id={id.toString()}
                    url={`/admin/providers/${id}`}
                  >
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                      {companyName}
                    </Text>
                    <div>{description}</div>
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
