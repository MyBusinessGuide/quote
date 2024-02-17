"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { type AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";
import { TRPCError } from "@trpc/server";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            toast.error((err as TRPCError).message);
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            toast.error((err as TRPCError).message);
          },
        }),
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ??
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
        <Toaster />
      </api.Provider>
    </QueryClientProvider>
  );
}
