import {
  Select,
  Card,
  Layout,
  BlockStack,
  InlineGrid,
  Button,
  Checkbox,
} from "@shopify/polaris";
import { getYear } from "date-fns";
import { Suspense, useMemo, useState } from "react";
import ReportTable from "./ReportTable.component";

const months = [
  {
    label: "January",
    value: " 1",
  },
  {
    label: "February",
    value: " 2",
  },
  {
    label: "March",
    value: " 3",
  },
  {
    label: "April",
    value: " 4",
  },
  {
    label: "May",
    value: " 5",
  },
  {
    label: "June",
    value: " 6",
  },
  {
    label: "July",
    value: " 7",
  },
  {
    label: "August",
    value: " 8",
  },
  {
    label: "September",
    value: " 9",
  },
  {
    label: "October",
    value: "10",
  },
  {
    label: "November",
    value: "11",
  },
  {
    label: "December",
    value: "12",
  },
];

export default function ReportTableCard({
  providerId,
}: {
  providerId: string;
}) {
  const years = useMemo(
    () =>
      Array.from({ length: 120 }).map((_, i) => {
        const y = getYear(new Date()) - i;
        return {
          label: `${y}`,
          value: `${y}`,
        };
      }),
    [],
  );

  const [selectedMonth, setSelectedMonth] = useState(months[0]!.value);
  const [selectedYear, setSelectedYear] = useState(years[0]!.value);
  const [allTimeChecked, setAllTimeChecked] = useState(true);

  return (
    <Layout.Section>
      <BlockStack gap="300">
        <Checkbox
          label="All time"
          checked={allTimeChecked}
          onChange={setAllTimeChecked}
        />
        {allTimeChecked ? null : (
          <InlineGrid columns=" 1fr 1fr" gap="400">
            <Select
              label="Month"
              options={months}
              onChange={setSelectedMonth}
              value={selectedMonth}
            />
            <Select
              label="Year"
              options={years}
              onChange={setSelectedYear}
              value={selectedYear}
            />
          </InlineGrid>
        )}
        <Card padding="0">
          <Suspense fallback={<div>Loading...</div>}>
            <ReportTable
              providerId={providerId}
              date={
                allTimeChecked
                  ? undefined
                  : new Date(`${selectedYear}-${selectedMonth}-01`)
              }
            />
          </Suspense>
        </Card>
      </BlockStack>
    </Layout.Section>
  );
}
