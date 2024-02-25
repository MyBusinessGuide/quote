import {
  BlockStack,
  Button,
  ButtonGroup,
  InlineStack,
  Modal,
  Select,
  Text,
} from "@shopify/polaris";
import { useState } from "react";
import { LeadCode } from "~/server/db/schema";
import { api } from "~/trpc/react";

type ConnectProviderLeadModalProps = {
  open: boolean;
  onClose: () => void;
  leadCode: keyof LeadCode;
  providerBid: {
    id: number;
    label: string;
  };
};

export default function ConnectProviderLeadModal({
  open,
  onClose,
  leadCode,
  providerBid,
}: ConnectProviderLeadModalProps) {
  const utils = api.useUtils();
  const [leads] = api.lead.getWhereLeadId.useSuspenseQuery({
    leadCode,
    providerBidId: providerBid.id,
  });
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(
    leads[0]?.id || null,
  );

  const { mutate: connect, isLoading } =
    api.lead.connectProviderBid.useMutation({
      onSuccess: () => {
        onClose();
        utils.provider.getProviderBids.invalidate();
        utils.lead.getWhereLeadId.invalidate({
          leadCode,
          providerBidId: providerBid.id,
        });
      },
    });

  return (
    <Modal open={open} title="Connect lead and provider bid" onClose={onClose}>
      <Modal.Section>
        <BlockStack gap="200">
          <Select
            label="Lead"
            options={leads.map((lead) => ({
              label: `${lead.companyName} - ${lead.fullName} `,
              value: lead.id.toString(),
            }))}
            value={selectedLeadId?.toString()}
            onChange={(value) => setSelectedLeadId(Number(value))}
            disabled={leads.length === 0}
          />
          <Select
            label="Provider Bid"
            options={[
              {
                label: providerBid.label,
                value: providerBid.id.toString(),
              },
            ]}
            disabled
          />
          {leads.length === 0 && <Text as="p">No leads found</Text>}
          <InlineStack align="end">
            <ButtonGroup>
              <Button
                loading={isLoading}
                onClick={() => {
                  if (!selectedLeadId) return;
                  connect({
                    leadId: selectedLeadId,
                    providerBidId: providerBid.id,
                  });
                }}
                variant="primary"
                disabled={leads.length === 0 || !selectedLeadId}
              >
                Connect
              </Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
