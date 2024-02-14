"use client";
import { useState } from "react";
import CompanyList from "~/app/_components/CompanyList/CompanyList.component";
import FlowLayout from "~/app/_components/FlowLayout";
import Input from "~/app/_components/Input.component";
import { useDebounce } from "~/app/_hooks/useDebounce";
import { CompanyListItemProps } from "~/app/_components/CompanyList/CompanyListItem.component";
import { api } from "~/trpc/react";

export default function Company() {
  const [query, setQuery] = useState("");
  const [selectedCompanyNumber, setSelectedCompanyNumber] =
    useState<string>("");
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, error } =
    api.companyApi.searchCompany.useQuery(debouncedQuery);

  const {
    data: dataOfficers,
    isLoading: isLoadingOfficers,
    error: errorOfficers,
  } = api.companyApi.getOfficers.useQuery({
    companyNumber: selectedCompanyNumber,
  });

  const items: CompanyListItemProps[] =
    data?.map((item) => ({
      id: item.company_number,
      title: item.title || "Company name",
      subtitle: `${item.address?.address_line_1 || "Address"}, ${
        item.address?.postal_code || "Postcode"
      }`,
      selected: false,
    })) || [];

  const officers: CompanyListItemProps[] =
    dataOfficers?.map((officer, index) => ({
      id: officer.name + index,
      title: officer.name,
      subtitle: `${officer.date_of_birth?.month}/${officer.date_of_birth?.year}`,
    })) || [];

  return (
    <FlowLayout
      backUrl="/industry"
      className="flex min-h-[50vh] flex-col gap-8"
    >
      <Input
        id={"company-name"}
        label={"Company name"}
        placeholder="James Gaming Company"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedCompanyNumber("");
        }}
      />
      <div>
        <h3 className="mb-1 font-medium">Select your company from below:</h3>
        <p className="text-sm">
          If a sole trader, please select that option below.
        </p>
      </div>
      <CompanyList
        isLoading={isLoading}
        items={items}
        selectedId={selectedCompanyNumber}
        onItemClick={(id) => setSelectedCompanyNumber(id)}
        error={error?.message}
      />

      <h3 className="mb-1 font-medium">Select who's applying for finance</h3>
      {!!selectedCompanyNumber && (
        <CompanyList
          isLoading={isLoadingOfficers}
          items={officers}
          selectedId={selectedCompanyNumber}
          onItemClick={(id) => setSelectedCompanyNumber(id)}
          error={errorOfficers?.message}
          numOfLoadingItems={3}
        />
      )}
    </FlowLayout>
  );
}
