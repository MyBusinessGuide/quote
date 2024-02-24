"use client";
import ProviderForm from "../_components/ProviderForm.component";
import { provider } from "../page";

export default function ProviderEditPage() {
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
        leadDeliveryMethod: provider.leadDeliveryMethod as
          | "URL"
          | "email"
          | "Zapier",
        fcaNumber: provider.fcaNumber,
      }}
      onSubmit={console.log}
      pageTitle={`Edit - ${provider.companyName}`}
    />
  );
}
