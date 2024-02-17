import { z } from "zod";
import { create } from "zustand";

export const invoiceFinancingValuesSchema = z.object({
  turnoverId: z.number().nullable(),
  industryId: z.number().nullable(),
  tenureId: z.number().nullable(),
  companyName: z.string().nullable(),
  companyNumber: z.string().nullable(),
  fullName: z.string().nullable(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  companyType: z.string().optional(),
  companyStatus: z.string().optional(),
});

export type InvoiceFinancingValues = z.infer<
  typeof invoiceFinancingValuesSchema
>;

export const invoiceFinancingDefaultValues: InvoiceFinancingValues = {
  turnoverId: null,
  industryId: null,
  companyName: null,
  tenureId: null,
  fullName: null,
  companyNumber: null,
  address: undefined,
  postalCode: undefined,
  companyType: undefined,
  companyStatus: undefined,
};

type UseInvoiceFinancingState = {
  data: InvoiceFinancingValues;
  setData: <
    Key extends keyof InvoiceFinancingValues,
    Value extends InvoiceFinancingValues[Key],
  >(
    key: Key,
    value: Value,
  ) => void;
  setAllData: (values: InvoiceFinancingValues) => void;
  set: (
    partial:
      | UseInvoiceFinancingState
      | Partial<UseInvoiceFinancingState>
      | ((
          state: UseInvoiceFinancingState,
        ) => UseInvoiceFinancingState | Partial<UseInvoiceFinancingState>),
    replace?: boolean | undefined,
  ) => void;
};

export const useInvoiceFinancingState = create<UseInvoiceFinancingState>(
  (set) => ({
    data: invoiceFinancingDefaultValues,
    setData: (key, value) =>
      set((prev) => ({ ...prev, data: { ...prev.data, [key]: value } })),
    setAllData: (values) => set((prev) => ({ ...prev, data: values })),
    set,
  }),
);
