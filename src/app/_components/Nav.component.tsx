import Link from "next/link";

export default function Nav() {
  return (
    <header className="flex h-20  items-center border-b-1  p-4">
      <Link href="/" className="text-lg font-medium text-primary">
        My Business Guide
      </Link>
    </header>
  );
}
