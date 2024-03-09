"use client";
import { useEffect } from "react";
import { env } from "~/env";

export default function Custom404() {
  useEffect(() => {
    window.location.replace(env.NEXT_PUBLIC_LANDING_URL);
  });

  return null;
}
