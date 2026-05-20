"use client";

import { type FormEvent, useState } from "react";
import { contactSectionContent } from "@/lib/content/contact-section";

const inputClassName =
  "w-full min-h-11 rounded-lg border border-surface-gray/35 bg-white px-3.5 py-2.5 text-sm text-surface-dark outline-none transition-[border-color,box-shadow] placeholder:text-surface-gray/80 focus:border-accent focus:ring-2 focus:ring-accent/20 sm:px-4";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { form, successMessage } = contactSectionContent;
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
      requirements: String(data.get("requirements") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[20rem] flex-col items-center justify-center px-6 py-12 text-center sm:px-8 sm:py-14 lg:px-10">
        <div className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg
            className="size-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-6 font-display text-xl font-semibold text-surface-dark">
          Request sent
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {successMessage}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-surface-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <h3 className="font-display text-xl font-semibold text-surface-dark sm:text-2xl">
        {form.title}
      </h3>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
        noValidate
      >
        <div>
          <label htmlFor="contact-name" className="sr-only">
            {form.fields.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={form.fields.name}
            className={inputClassName}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="contact-email" className="sr-only">
              {form.fields.email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={form.fields.email}
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="sr-only">
              {form.fields.phone}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={form.fields.phone}
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-budget" className="sr-only">
            {form.fields.budget}
          </label>
          <select
            id="contact-budget"
            name="budget"
            required
            defaultValue=""
            className={`${inputClassName} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10 text-surface-dark`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23AAA8AA'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            }}
          >
            {form.budgetOptions.map((option) => (
              <option key={option.value} value={option.value} disabled={!option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-requirements" className="sr-only">
            {form.fields.requirements}
          </label>
          <textarea
            id="contact-requirements"
            name="requirements"
            required
            rows={4}
            placeholder={form.fields.requirementsPlaceholder}
            className={`${inputClassName} min-h-[7.5rem] resize-y`}
          />
        </div>

        {errorMessage ? (
          <p className="text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-surface-dark transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : form.submitLabel}
        </button>
      </form>
    </div>
  );
}
