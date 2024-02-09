import Button from "./_components/Button.component";

export default async function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-evenly p-4">
      <ul className="flex w-full flex-col gap-4">
        <Button variant="secondary" fullWidth>
          Sole Trader
        </Button>
        <Button variant="secondary" fullWidth>
          Limited Company
        </Button>
        <Button variant="secondary" fullWidth>
          Partnership
        </Button>
      </ul>

      <Button variant={"primary"} fullWidth loading>
        Next
      </Button>
    </main>
  );
}
