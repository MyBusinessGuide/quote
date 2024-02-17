"use client";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Button from "~/app/_components/Button.component";
import CompanyList from "~/app/_components/CompanyList/CompanyList.component";
import CompanyListItem, {
  CompanyListItemProps,
} from "~/app/_components/CompanyList/CompanyListItem.component";
import Input from "~/app/_components/Input.component";
import useInvoiceFinancing from "~/app/_hooks/useInvoiceFinancing";
import { api } from "~/trpc/react";

export default function OfficerSelect() {
  const { values: invoiceFinancingState, setValue: setInvoiceFinancingState } =
    useInvoiceFinancing();
  const [nameAvailable, setNameAvailable] = useState(true);

  const {
    data: dataOfficers,
    isLoading: isLoadingOfficers,
    error: errorOfficers,
  } = api.companyApi.getOfficers.useQuery({
    companyNumber: invoiceFinancingState.companyNumber ?? "",
  });

  const officers: CompanyListItemProps[] =
    dataOfficers?.map((officer, index) => ({
      id: officer.name + index,
      title: officer.name,
      subtitle: `${officer.date_of_birth?.month}/${officer.date_of_birth?.year}`,
    })) ?? [];

  return (
    <>
      <div>
        <button
          onClick={() => {
            setInvoiceFinancingState("companyNumber", null);
            setInvoiceFinancingState("companyName", null);
            setInvoiceFinancingState("fullName", null);
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <CompanyListItem
          id={invoiceFinancingState.companyNumber ?? "-1"}
          title={invoiceFinancingState.companyName ?? "Error"}
          subtitle={invoiceFinancingState.companyNumber || ""}
          selected
          className="pt-0"
        />
      </div>
      <h3 className="mb-1 mt-4 font-medium">
        Who&apos;s applying for finance?
      </h3>
      {(!isLoadingOfficers && officers.length === 0) || !nameAvailable ? (
        <Input
          value={invoiceFinancingState.fullName || undefined}
          onChange={(e) => setInvoiceFinancingState("fullName", e.target.value)}
          id="officers-input"
          label="Full name"
          placeholder="Jane Smith"
        />
      ) : (
        <>
          <CompanyList
            isLoading={isLoadingOfficers}
            items={officers}
            selectedId={invoiceFinancingState.fullName || ""}
            onItemClick={(value) => setInvoiceFinancingState("fullName", value)}
            error={errorOfficers?.message}
            numOfLoadingItems={3}
          />
          <Button
            variant={"underline"}
            onClick={() => {
              setInvoiceFinancingState("fullName", "");
              setNameAvailable(false);
            }}
          >
            Not there?
          </Button>
        </>
      )}
    </>
  );
}
