type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  /** Text after the accent span (e.g. "say" in "What our clients say") */
  titleSuffix?: string;
  description?: string;
  theme?: "dark" | "light";
};

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  titleSuffix,
  description,
  theme = "dark",
}: PageHeroProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`relative overflow-x-clip border-b py-12 sm:py-16 lg:py-20 ${
        isDark
          ? "border-white/10 bg-surface-dark"
          : "border-surface-gray/15 bg-surface-white"
      }`}
    >
      {isDark ? (
        <div
          className="pointer-events-none absolute -left-20 top-1/4 size-48 rounded-full bg-accent/10 blur-3xl sm:size-72"
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute -right-16 top-0 size-48 rounded-full bg-accent-soft blur-3xl sm:size-64"
          aria-hidden
        />
      )}

      <div className="relative mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p
          className={`text-[0.65rem] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.2em] ${
            isDark ? "text-surface-gray" : "text-surface-gray"
          }`}
        >
          {eyebrow}
        </p>
        <h1
          className={`mt-3 font-display text-[1.75rem] font-semibold leading-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] ${
            isDark ? "text-white" : "text-surface-dark"
          }`}
        >
          {title}{" "}
          {titleAccent ? (
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              {titleAccent}
            </span>
          ) : null}
          {titleSuffix ? ` ${titleSuffix}` : null}
        </h1>
        {description ? (
          <p
            className={`mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed sm:text-base md:text-lg ${
              isDark ? "text-white/75" : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
