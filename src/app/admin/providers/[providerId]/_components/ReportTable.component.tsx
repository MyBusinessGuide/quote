"use client";
import { DataTable } from "@shopify/polaris";
import { format } from "date-fns";
import { api } from "~/trpc/react";

type ReportTableProps = { providerId: string; date?: Date };

export default function ReportTable({ providerId, date }: ReportTableProps) {
  const [rows] = api.provider.getReport.useSuspenseQuery(
    {
      providerId: Number(providerId),
      date,
    },
    {
      select: (data) => {
        return data.map((row) => {
          return [
            row.companyName,
            row.officerName,
            row.date ? format(row.date, "dd/MM/yyyy") : "no-date",
            row.leadCode,
            row.amountGBP,
          ];
        });
      },
    },
  );

  const totalPrice = rows.reduce((total, row) => {
    return total + Number(row.at(-1));
  }, 0);

  return (
    <DataTable
      columnContentTypes={["text", "text", "text", "text", "numeric"]}
      headings={[
        "Company name",
        "Officer name",
        "Date connected",
        "Lead code",
        "Price (GBP)",
      ]}
      rows={rows}
      totals={["", "", "", "", `${totalPrice} GBP`]}
      showTotalsInFooter
    />
  );
}
