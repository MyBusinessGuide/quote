"use client";
import { api } from "~/trpc/react";
import ProviderForm from "../_components/ProviderForm.component";
import { useRouter } from "next/navigation";

type ProviderEditParams = { params: { providerId: string } };
export default function ProviderEditPage({
  params: { providerId },
}: ProviderEditParams) {
  const router = useRouter();
  const [{ provider, service }] = api.provider.get.useSuspenseQuery(
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
        companyName: provider.companyName,
        companyNumber: provider.companyNumber,
        contactName: provider.contactName,
        email: provider.email,
        phoneNumber: provider.phoneNumber,
        address: provider.address,
        maxMonthlyBudgetGBP: provider.maxMonthlyBudgetGBP,
        leadDeliveryMethod: provider.leadDeliveryMethod,
        fcaNumber: provider.fcaNumber,
        priority: provider.priority,
      }}
      onSubmit={(values) => editProvider({ ...values, id: Number(providerId) })}
      pageTitle={`Edit - ${provider.companyName}`}
      backUrl={`/admin/providers/${providerId}`}
      isLoading={isLoading}
    />
  );
}
