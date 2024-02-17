"use client";
import { ChangeEvent, useState } from "react";
import FlowLayout from "~/app/_components/FlowLayout";
import Input from "~/app/_components/Input.component";
import { useDebounce } from "~/app/_hooks/useDebounce";
import useInvoiceFinancing from "~/app/_hooks/useInvoiceFinancing";
import CompanySearch from "./_components/CompanySearch.component";
import OfficerSelect from "./_components/OfficerSelect.component";
import Button from "~/app/_components/Button.component";
import Link from "next/link";

export default function Company() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { values: invoiceFinancingState, setValue: setInvoiceFinancingState } =
    useInvoiceFinancing();

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setInvoiceFinancingState("companyName", null);
    setInvoiceFinancingState("companyNumber", null);
  };

  return (
    <>
      <Input
        id={"company-name"}
        label={"Company name"}
        placeholder="James Gaming Company"
        value={query}
        onChange={onSearch}
        className="mb-6"
      />
      <div>
        <h3 className="mb-1 font-medium">Select your company from below:</h3>
        <p className="text-sm">
          If a sole trader, please select that option below.
        </p>
      </div>
      {invoiceFinancingState.companyNumber ? (
        <OfficerSelect />
      ) : (
        <CompanySearch query={debouncedQuery} />
      )}
      <Link href="contact" className="w-full">
        <Button
          className="mt-8"
          disabled={
            !invoiceFinancingState.companyNumber ||
            !invoiceFinancingState.fullName
          }
          fullWidth
        >
          Next
        </Button>
      </Link>
    </>
  );
}
