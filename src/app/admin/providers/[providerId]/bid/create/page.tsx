"use client";
import { api } from "~/trpc/react";
import BidForm from "../_components/BidForm.component";
import { useRouter } from "next/navigation";

export default function BidCreatePage({
  params: { providerId },
}: {
  params: { providerId: string };
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const { mutate: createProviderBid, isLoading } =
    api.providerBid.create.useMutation({
      onSuccess: async () => {
        router.push(`/admin/providers/${providerId}`);
        await utils.provider.getProviderBids.invalidate({
          id: Number(providerId),
        });
      },
    });

  return (
    <BidForm
      onSubmit={(values) => {
        createProviderBid(values);
      }}
      defaultValues={{
        amountGBP: 0,
        leadCode: "A1",
        providerId: Number(providerId),
      }}
      pageTitle={"Create Bid"}
      isLoading={isLoading}
      backUrl={`/admin/providers/${providerId}`}
    />
  );
}
