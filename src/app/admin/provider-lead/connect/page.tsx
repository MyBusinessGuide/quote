"use client";

import { BlockStack, Layout, Page, Select } from "@shopify/polaris";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { api } from "~/trpc/react";

export default function ProviderLeadConnect() {
  const searchParams = useSearchParams();

  const _backUrl = searchParams.get("backUrl");
  const defaultProviderId = searchParams.get("providerId");
  const defaultProviderBidId = searchParams.get("providerBidId");
  const defaultLeadId = searchParams.get("leadId");

  const [providerId, setProviderId] = useState(defaultProviderId || undefined);
  const [providerBidId, setProviderBidId] = useState(
    defaultProviderBidId || undefined,
  );
  const [leadId, setLeadId] = useState(defaultLeadId || undefined);

  const backUrl = useMemo(() => {
    switch (_backUrl) {
      case "provider":
        return "/admin/provider";
      case "lead":
        return "/admin/lead";
      default:
        return "/admin/lead";
    }
  }, [_backUrl]);

  const [] = api.lead.getWhereLeadId.useSuspenseQuery({ leadCode: leadId });

  return (
    <Page
      title="Connect provider and lead"
      backAction={{ url: backUrl }}
    ></Page>
  );
}
