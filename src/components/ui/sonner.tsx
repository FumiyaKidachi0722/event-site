"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="top-right"
      toastOptions={{
        className: "site-panel-violet text-[var(--text-primary)]",
      }}
    />
  );
}
