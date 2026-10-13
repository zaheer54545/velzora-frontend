"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// The storefront is a browser-first app (auth token, cart, wishlist and
// language live in localStorage and are read while rendering), exactly like the
// original single-page build. The shell is therefore rendered on the client
// only, which keeps the markup and behaviour identical and avoids hydration
// mismatches.
const AppShell = dynamic(() => import("./AppShell"), { ssr: false });

export default function ClientRoot({ children }) {
  return (
    <Suspense fallback={null}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
