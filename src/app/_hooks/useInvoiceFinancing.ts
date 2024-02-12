import { useEffect } from "react";
import {
  InvoiceFinancingValues,
  invoiceFinancingDefaultValues,
  invoiceFinancingValuesSchema,
  useInvoiceFinancingState,
} from "../_state/invoiceFinancingStore";

export default function useInvoiceFinancing() {
  const { data, setData, setAllData } = useInvoiceFinancingState();

  useEffect(() => {
    const localStorageData = localStorage.getItem("invoice-financing");
    if (!localStorageData)
      localStorage.setItem(
        "invoice-financing",
        JSON.stringify(invoiceFinancingDefaultValues),
      );
    else
      try {
        setAllData(
          invoiceFinancingValuesSchema.parse(JSON.parse(localStorageData)),
        );
      } catch (error) {
        localStorage.setItem(
          "invoice-financing",
          JSON.stringify(invoiceFinancingDefaultValues),
        );
      }
  }, []);

  function setValue<
    Key extends keyof InvoiceFinancingValues,
    Value extends InvoiceFinancingValues[Key],
  >(key: Key, value: Value) {
    localStorage.setItem(
      "invoice-financing",
      JSON.stringify({ ...data, [key]: value }),
    );
    setData(key, value);
    return;
  }

  return {
    values: data,
    setValue,
  };
}
