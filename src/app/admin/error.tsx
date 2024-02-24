"use client";

import { TRPCError } from "@trpc/server";

type ErrorProps = {
  error: TRPCError;
};

export default function Error({ error }: ErrorProps) {
  console.error(error);
  return <div>Error - {error.message}</div>;
}
