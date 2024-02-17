"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "~/app/_components/Button.component";
import CompanyList from "~/app/_components/CompanyList/CompanyList.component";
import { CompanyListItemProps } from "~/app/_components/CompanyList/CompanyListItem.component";
import useInvoiceFinancing from "~/app/_hooks/useInvoiceFinancing";
import { api } from "~/trpc/react";

type CompanySearchProps = {
  query: string;
};

export default function CompanySearch({ query }: CompanySearchProps) {
  const { values: invoiceFinancingState, setValue: setInvoiceFinancingState } =
    useInvoiceFinancing();

  const navigate = useRouter();

  const onCompanySelect = (companyNumber: string) => {
    const company = data?.find((c) => c.company_number === companyNumber);
    setInvoiceFinancingState("companyNumber", companyNumber);
    setInvoiceFinancingState("fullName", null);
    setInvoiceFinancingState("companyName", company?.title ?? null);
    setInvoiceFinancingState("tenureId", 1 ?? null);
  };

  const { data, isLoading, error } = api.companyApi.searchCompany.useQuery(
    query,
    {
      refetchOnMount: false,
    },
  );

  const items: CompanyListItemProps[] =
    data?.map((item) => ({
      id: item.company_number,
      title: item.title ?? "Company name",
      subtitle: `${item.address?.address_line_1 ?? "Address"}, ${
        item.address?.postal_code ?? "Postcode"
      }`,
      selected: false,
    })) ?? [];

  return (
    <>
      <CompanyList
        isLoading={isLoading}
        items={items}
        selectedId={invoiceFinancingState.companyNumber || undefined}
        onItemClick={onCompanySelect}
        error={error?.message}
      />

      <Button
        variant={"underline"}
        disabled={!query}
        onClick={() => {
          setInvoiceFinancingState("companyName", query);
          navigate.push("tenure");
        }}
      >
        Not there?
      </Button>
    </>
  );
}
