import type { ProcessStepContent } from "@/lib/content/process-section";

type ProcessStepProps = {
  step: ProcessStepContent;
  index: number;
  total: number;
};

export function ProcessStep({ step, index, total }: ProcessStepProps) {
  const isLast = index === total - 1;

  return (
    <article className="group relative flex h-full min-w-0 flex-col">
      {!isLast ? (
        <span
          className="absolute left-[1.35rem] top-14 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent/50 to-accent/10 lg:hidden"
          aria-hidden
        />
      ) : null}

      <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-[border-color,background-color,box-shadow] duration-300 hover:border-accent/35 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-24px_rgba(7,188,174,0.28)] sm:p-6 lg:rounded-xl lg:p-5 xl:p-6">
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:rounded-xl"
          aria-hidden
        />

        <div className="relative flex items-start gap-4 lg:flex-col lg:gap-0">
          <div className="flex shrink-0 items-center justify-center">
            <span
              className="flex size-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-sm font-bold tabular-nums text-accent sm:size-12 sm:text-base lg:mb-5 lg:size-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:text-4xl lg:font-bold xl:text-[2.75rem] xl:leading-none"
              aria-hidden
            >
              {step.number}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70 sm:mt-2.5 sm:text-[0.9375rem] lg:mt-3">
              {step.description}
            </p>
          </div>
        </div>
      </div>

      {!isLast ? (
        <span
          className="pointer-events-none absolute -right-2 top-12 hidden h-px w-4 bg-accent/40 lg:block xl:-right-3 xl:w-6"
          aria-hidden
        />
      ) : null}
    </article>
  );
}
