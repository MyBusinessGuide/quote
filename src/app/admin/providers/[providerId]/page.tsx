"use client";
import {
  Layout,
  Page,
  Text,
  Card,
  BlockStack,
  DescriptionList,
} from "@shopify/polaris";
import { api } from "~/trpc/react";

type ProviderParams = { params: { providerId: string } };

export default function Provider({ params: { providerId } }: ProviderParams) {
  console.log(providerId);
  const [data] = api.provider.get.useSuspenseQuery(
    { id: Number(providerId) },
    {
      useErrorBoundary: true,
    },
  );

  return (
    <Page
      title={`Provider - ${data.companyName}`}
      // subtitle="Provider from: December 2021"
      secondaryActions={[
        { content: "Edit", onAction: () => console.log("Edit") },
        {
          content: "Delete",
          onAction: () => console.log("Delete"),
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
    </Page>
  );
}
