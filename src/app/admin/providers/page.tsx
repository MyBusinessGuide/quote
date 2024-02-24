"use client";

import {
  Card,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Text,
} from "@shopify/polaris";

export default function Providers() {
  return (
    <Page title="Providers">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{ singular: "customer", plural: "customers" }}
              items={[
                {
                  id: "100",
                  url: "#",
                  name: "Mae Jemison",
                  location: "Decatur, USA",
                },
                {
                  id: "200",
                  url: "#",
                  name: "Ellen Ochoa",
                  location: "Los Angeles, USA",
                },
              ]}
              renderItem={(item) => {
                const { id, url, name, location } = item;

                return (
                  <ResourceItem id={id} url={url}>
                    <Text variant="bodyMd" fontWeight="bold" as="h3">
                      {name}
                    </Text>
                    <div>{location}</div>
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
