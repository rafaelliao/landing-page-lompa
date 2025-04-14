"use client";

import { type ReactNode, useEffect, useState } from "react";

interface ClientWrapperProps {
  children: ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Server-side rendering - minimal placeholder
    return <div className="opacity-0">{children}</div>;
  }

  return <>{children}</>;
}
