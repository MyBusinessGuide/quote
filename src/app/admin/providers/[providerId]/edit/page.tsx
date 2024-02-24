"use client";
import { api } from "~/trpc/react";
import ProviderForm from "../_components/ProviderForm.component";
import { useRouter } from "next/navigation";

type ProviderEditParams = { params: { providerId: string } };
export default function ProviderEditPage({
  params: { providerId },
}: ProviderEditParams) {
  const router = useRouter();
  const [data] = api.provider.get.useSuspenseQuery(
    { id: Number(providerId) },
    {
      useErrorBoundary: true,
    },
  );

  const { mutate: editProvider, isLoading } = api.provider.edit.useMutation({
    onSuccess: () => {
      router.push(`/admin/providers/${providerId}`);
    },
  });

  return (
    <ProviderForm
      defaultValues={{
        companyName: data.companyName,
        companyNumber: data.companyNumber,
        contactName: data.contactName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        maxMonthlyBudgetGBP: data.maxMonthlyBudgetGBP,
        leadDeliveryMethod: data.leadDeliveryMethod,
        fcaNumber: data.fcaNumber,
      }}
      onSubmit={(values) => editProvider({ ...values, id: Number(providerId) })}
      pageTitle={`Edit - ${data.companyName}`}
      backUrl={`/admin/providers/${providerId}`}
      isLoading={isLoading}
    />
  );
}
