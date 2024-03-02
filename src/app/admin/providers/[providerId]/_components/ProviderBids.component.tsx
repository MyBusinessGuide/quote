import { Layout } from "@shopify/polaris";
import { api } from "~/trpc/react";
import ProviderBidTable from "./ProviderBidTable.component";

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

  return providerBids.map((providerBid) => {
    return (
      <ProviderBidTable key={providerBid.providerBid.id} {...providerBid} />
    );
  });
}
