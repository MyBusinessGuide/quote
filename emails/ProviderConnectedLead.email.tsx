import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Tailwind } from "@react-email/tailwind";
import { sendEmail } from "~/lib/email";
import { render } from "@react-email/render";

type ProviderConnectionEmailProps = {
  providerName: string;
  fullName: string;
  quoteDate: string;
  loanAmount: string;
  turnover: string;
  tenure: string;
  industry: string;
  companyName: string;
  phoneNumber: string;
  customerEmail: string;
  winningBidAmount: string;
};

export const sendProviderEmail = ({
  providerEmail,
  ...rest
}: ProviderConnectionEmailProps & { providerEmail: string }) => {
  console.log("Sending email to provider", providerEmail);
  sendEmail({
    to: providerEmail,
    subject: "[BUSINESS NAME] is looking for Invoice Financing",
    html: render(
      ProviderConnectionEmail({
        ...rest,
        loanAmount: "£" + rest.loanAmount,
      }),
    ),
  });
};

export default function ProviderConnectionEmail({
  providerName,
  fullName,
  quoteDate,
  loanAmount,
  turnover,
  tenure,
  industry,
  companyName,
  phoneNumber,
  customerEmail,
  winningBidAmount,
}: ProviderConnectionEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Section className="font-sans">
          <Container className="flex flex-col gap-4">
            <Container>
              <Text className="text-lg">Hi there {providerName}!</Text>
              <Text className="text-xl font-bold">You got a lead!</Text>
            </Container>

            <Container className="flex flex-col gap-2">
              <Text className=" font-semibold">Lead Details:</Text>

              <Text key="full-name">
                Full Name: <strong>{fullName}</strong>
              </Text>
              <Text key="phone-number">
                Phone Number: <strong>{phoneNumber}</strong>
              </Text>
              <Text key="email">
                Email: <strong>{customerEmail}</strong>
              </Text>
              <Text key="company-name">
                Company Name: <strong>{companyName}</strong>
              </Text>
              <Text key="annual-turnover">
                Annual Turnover: <strong>{turnover}</strong>
              </Text>
              <Text key="industry">
                Industry: <strong>{industry}</strong>
              </Text>
              <Text key="tenure">
                Tenure: <strong>{tenure}</strong>
              </Text>
              <Text key="loan amount">
                Loan Amount: <strong>{loanAmount}</strong>
              </Text>
              <Text key="quote-date">
                Quote Date: <strong>{quoteDate}</strong>
              </Text>
              <Text key="winning-bid">
                The lead was brought for <strong>{winningBidAmount}</strong>
              </Text>
            </Container>

            <Text>Thanks</Text>
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
}
