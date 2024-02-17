import { useEffect } from "react";
import {
  InvoiceFinancingValues,
  invoiceFinancingDefaultValues,
  invoiceFinancingValuesSchema,
  useInvoiceFinancingState,
} from "../_state/invoiceFinancingStore";

export default function useInvoiceFinancing() {
  const { data, setData, setAllData, set } = useInvoiceFinancingState();

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
    // set used to get the correct previous state
    set((prev) => {
      localStorage.setItem(
        "invoice-financing",
        JSON.stringify({ ...prev.data, [key]: value }),
      );
      return prev;
    });
    setData(key, value);
    return;
  }

  const clear = () => {
    setAllData(invoiceFinancingDefaultValues);
    localStorage.setItem(
      "invoice-financing",
      JSON.stringify(invoiceFinancingDefaultValues),
    );
  };

  return {
    values: data,
    setValue,
    clear,
  };
}
