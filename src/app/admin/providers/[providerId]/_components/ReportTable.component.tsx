"use client";
import { Button, DataTable } from "@shopify/polaris";
import { format } from "date-fns";
import Link from "next/link";
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
            <Link key={row.id} href={`/admin/leads/${row.leadId}`}>
              <Button variant="plain">View</Button>
            </Link>,
          ];
        });
      },
    },
  );

  const totalPrice = rows.reduce((total, row) => {
    return total + Number(row.at(-2));
  }, 0);

  return (
    <DataTable
      columnContentTypes={[
        "text",
        "text",
        "text",
        "text",
        "numeric",
        "numeric",
      ]}
      headings={[
        "Company name",
        "Officer name",
        "Date connected",
        "Lead code",
        "Price (GBP)",
        "Actions",
      ]}
      rows={rows}
      totals={["", "", "", "", `${totalPrice} GBP`, ""]}
      showTotalsInFooter
    />
  );
}
