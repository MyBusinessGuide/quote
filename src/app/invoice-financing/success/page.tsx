import Button from "~/app/_components/Button.component";
import FlowLayout from "~/app/_components/FlowLayout";
import Input from "~/app/_components/Input.component";

export default function Success() {
  return (
    <FlowLayout
      backUrl="/invoice-financing/tenure"
      className="flex flex-col gap-8"
    >
      <h2 className="mb-8 text-center text-lg text-primary">
        Tell us about yourself
      </h2>
      <Input
        id={"full-name"}
        label={"Full name"}
        placeholder="Jane Smith"
        required
      />
      <Input
        id={"phone-number"}
        type="tel"
        label={"Phone number"}
        placeholder="07400 123456"
        required
      />
      <Input
        id={"email"}
        type="email"
        label="Email"
        placeholder="contact@contact.com"
        required
      />

      <p className="text-center">
        By filling out this form you agree to our{" "}
        <span className="underline">terms of business</span> and our{" "}
        <span className="underline">privacy policy</span>
      </p>

      <Button>Find Expert</Button>
    </FlowLayout>
  );
}
