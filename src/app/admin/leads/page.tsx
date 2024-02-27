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
                  lead: { id, companyName, leadCode },
                  user: { name },
                } = item;

                return (
                  <ResourceItem id={id.toString()} url={`/admin/leads/${id}`}>
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                      {companyName} - {leadCode}
                    </Text>
                    <div>{name}</div>
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
