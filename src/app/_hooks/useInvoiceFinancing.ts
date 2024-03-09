import { useEffect } from "react";
import {
  InvoiceFinancingValues,
  useInvoiceFinancingState,
} from "../_state/invoiceFinancingStore";
import { useRouter } from "next/navigation";

export enum PageEnum {
  Company = "company",
  Turnover = "turnover",
  Industry = "industry",
  Tenure = "tenure",
  Contact = "contact",
}

type Requirements = { [key in PageEnum]: (keyof InvoiceFinancingValues)[] };

const requirements: Requirements = {
  [PageEnum.Turnover]: [],
  [PageEnum.Industry]: ["turnoverId"],
  [PageEnum.Company]: ["turnoverId", "industryId"],
  [PageEnum.Tenure]: ["turnoverId", "industryId", "companyName"],
  [PageEnum.Contact]: ["turnoverId", "industryId", "companyName", "tenureId"],
};

export default function useInvoiceFinancing(
  currentPage: PageEnum,
  prevAmount: number,
) {
  const state = useInvoiceFinancingState();
  const router = useRouter();

  useEffect(() => {
    const requiredFields = requirements[currentPage];
    const isMissingRequiredFields = requiredFields.some(
      (field) => !state.data[field],
    );

    if (isMissingRequiredFields) {
      state.clear();
      router.push(`/invoice-financing/${prevAmount}/turnover`);
    }
  }, []);

  return state;
}
