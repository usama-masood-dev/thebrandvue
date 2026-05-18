import type { ReactNode } from "react";

type HeaderShellProps = {
  children: ReactNode;
  className?: string;
};

export function HeaderShell({ children, className }: HeaderShellProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}
    >
      <div className="flex min-h-[56px] items-center justify-between gap-3 sm:min-h-[60px] lg:min-h-[72px] lg:gap-6">
        {children}
      </div>
    </div>
  );
}

export function HeaderCenter({ children }: { children: ReactNode }) {
  return (
    <div className="relative hidden flex-1 items-center justify-center lg:flex">
      {children}
    </div>
  );
}

export function HeaderActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
      {children}
    </div>
  );
}
