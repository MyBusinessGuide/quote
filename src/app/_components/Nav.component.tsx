import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b-1 flex  h-20 items-center  p-4">
      <Link href="/" className="text-primary text-lg font-medium">
        BA BA BILLS
      </Link>
    </header>
  );
}
