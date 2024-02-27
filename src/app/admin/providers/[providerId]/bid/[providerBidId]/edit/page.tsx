"use client";

import { useRouter } from "next/navigation";
import BidForm from "../../_components/BidForm.component";
import { api } from "~/trpc/react";

export default function BidEditPage({
  params: { providerId, providerBidId },
}: {
  params: { providerId: string; providerBidId: string };
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate: updateProviderBid, isLoading: isLoadingUpdate } =
    api.providerBid.update.useMutation({
      onSuccess: () => {
        router.push(`/admin/providers/${providerId}`);
        utils.provider.getProviderBids.invalidate({
          id: Number(providerId),
        });
      },
    });

  const [data] = api.providerBid.get.useSuspenseQuery({
    id: Number(providerBidId),
  });

  return (
    <BidForm
      onSubmit={(values) => {
        updateProviderBid({ ...values, providerBidId: Number(providerBidId) });
      }}
      defaultValues={{
        amountGBP: data?.amountGBP || 0,
        leadCode: data?.leadCode || "A1",
        providerId: Number(providerId),
      }}
      isLoading={isLoadingUpdate}
      pageTitle={`Edit Bid ${data?.leadCode} - ${data?.amountGBP} GBP`}
      backUrl={`/admin/providers/${providerId}`}
    />
  );
}
