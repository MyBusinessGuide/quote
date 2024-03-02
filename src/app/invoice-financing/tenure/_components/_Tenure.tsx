"use client";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { api as apiServer } from "~/trpc/server";
import RadioGroup from "~/app/_components/RadioGroup/RadioGroup.component";
import { sendGTMEvent } from "@next/third-parties/google";
import useInvoiceFinancing, {
  PageEnum,
} from "~/app/_hooks/useInvoiceFinancing";

type TenureProps = {
  initialData: Awaited<ReturnType<typeof apiServer.tenure.getAll.query>>;
};

export default function Tenure({ initialData }: TenureProps) {
  const router = useRouter();
  const { data, error, isLoading } = api.tenure.getAll.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const { data: values, setData: setValue } = useInvoiceFinancing(
    PageEnum.Tenure,
  );

  const onValueChange = (value: string) => {
    sendGTMEvent({
      event: "invoice_finance_not_there_tenure",
      value: "invoice_finance_not_there_tenure",
    });
    setValue("tenureId", Number(value));
    router.push("/invoice-financing/contact");
  };

  const items = data?.map((item) => ({
    label: item.label,
    value: item.id,
  }));

  if (data && items)
    return (
      <RadioGroup
        items={items}
        onValueChange={onValueChange}
        value={values.tenureId?.toString()}
      />
    );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
}
