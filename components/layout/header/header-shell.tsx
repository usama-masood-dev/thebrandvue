import type { ReactNode } from "react";

type HeaderShellProps = {
  children: ReactNode;
  className?: string;
};

export function HeaderShell({ children, className }: HeaderShellProps) {
  return (
    <div
      className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-5 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function HeaderCenter({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-1 items-center justify-center">
      {children}
    </div>
  );
}

export function HeaderActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">{children}</div>
  );
}
