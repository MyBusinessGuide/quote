"use client";
import { Spinner } from "@shopify/polaris";

export default function AdminLoading() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Spinner />
    </div>
  );
}
