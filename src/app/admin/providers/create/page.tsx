"use client";

import { useRouter } from "next/navigation";
import ProviderForm from "../[providerId]/_components/ProviderForm.component";
import { api } from "~/trpc/react";

export default function ProviderCreatePage() {
  const router = useRouter();

  const { mutate: createProvider, isLoading } = api.provider.create.useMutation(
    {
      onSuccess: (data) => {
        router.push(`/admin/providers/${data.id}`);
      },
    },
  );

  return (
    <ProviderForm
      defaultValues={{
        companyName: "",
        companyNumber: "",
        contactName: "",
        email: "",
        phoneNumber: "",
        address: "",
        maxMonthlyBudgetGBP: 0,
        leadDeliveryMethod: "email",
        fcaNumber: "",
      }}
      onSubmit={(values) => createProvider(values)}
      pageTitle="Create Provider"
      backUrl="/admin/providers"
      isLoading={isLoading}
    />
  );
}
