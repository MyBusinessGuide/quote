"use client";
import { useRouter } from "next/navigation";
import Button from "~/app/_components/Button.component";
import CompanyList from "~/app/_components/CompanyList/CompanyList.component";
import { CompanyListItemProps } from "~/app/_components/CompanyList/CompanyListItem.component";
import useInvoiceFinancing from "~/app/_hooks/useInvoiceFinancing";
import { api } from "~/trpc/react";
import { intervalToDuration } from "date-fns";

type CompanySearchProps = {
  query: string;
};

export default function CompanySearch({ query }: CompanySearchProps) {
  const { values: invoiceFinancingState, setValue: setInvoiceFinancingState } =
    useInvoiceFinancing();

  const navigate = useRouter();

  const onCompanySelect = (companyNumber: string) => {
    const company = data?.find((c) => c.company_number === companyNumber);
    const tenureYrs = company?.date_of_creation
      ? intervalToDuration({
          start: new Date(company.date_of_creation),
          end: new Date(),
        }).years
      : undefined;

    let tenureId: number | null;

    if (!tenureYrs || tenureYrs <= 1) {
      tenureId = 1;
    } else if (tenureYrs <= 2) {
      tenureId = 2;
    } else if (tenureYrs <= 5) {
      tenureId = 3;
    } else tenureId = 4;

    setInvoiceFinancingState("companyNumber", companyNumber);
    setInvoiceFinancingState("fullName", null);
    setInvoiceFinancingState("companyName", company?.title ?? null);
    setInvoiceFinancingState("tenureId", tenureId);
    setInvoiceFinancingState(
      "address",
      company?.address?.address_line_1 ?? undefined,
    );
    setInvoiceFinancingState(
      "postalCode",
      company?.address?.postal_code ?? undefined,
    );
    setInvoiceFinancingState("companyType", company?.company_type ?? undefined);
    setInvoiceFinancingState(
      "companyStatus",
      company?.company_status ?? undefined,
    );
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
        selectedId={invoiceFinancingState.companyNumber ?? undefined}
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
