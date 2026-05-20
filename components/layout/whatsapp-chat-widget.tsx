"use client";

import { useCallback, useEffect, useState } from "react";
import { whatsappWidgetContent } from "@/lib/content/whatsapp-widget";

const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_GREEN_HOVER = "#20BD5A";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Free WhatsApp chat prompt — opens wa.me with pre-filled message */
export function WhatsAppChatWidget() {
  const { prompt, openChatLabel, fabLabel, headerTitle, chatUrl } =
    whatsappWidgetContent;
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <div
      className="fixed bottom-4 right-4 z-[55] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      aria-live="polite"
    >
      {open ? (
        <div
          className="w-[min(calc(100vw-2rem),20rem)] overflow-hidden rounded-2xl bg-[#f0f2f5] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] sm:w-80"
          role="dialog"
          aria-label="WhatsApp chat"
        >
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{ backgroundColor: WHATSAPP_GREEN }}
          >
            <span className="text-sm font-semibold tracking-wide">
              {headerTitle}
            </span>
            <button
              type="button"
              onClick={close}
              className="flex size-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15"
              aria-label="Close chat"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3 px-4 py-5">
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-snug text-surface-dark shadow-sm">
              Hello, welcome to <strong>{headerTitle}</strong>
            </div>
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-surface-dark shadow-sm">
              {prompt}
            </div>
          </div>

          <div className="flex justify-end px-4 pb-4">
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:opacity-95"
              style={{ backgroundColor: WHATSAPP_GREEN }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = WHATSAPP_GREEN_HOVER;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = WHATSAPP_GREEN;
              }}
            >
              {openChatLabel}
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex size-14 items-center justify-center rounded-full text-white shadow-[0_8px_24px_-4px_rgba(37,211,102,0.55)] transition-transform hover:scale-105 active:scale-95 sm:size-[3.75rem]"
        style={{ backgroundColor: WHATSAPP_GREEN }}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : fabLabel}
      >
        {open ? (
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <WhatsAppIcon className="size-7" />
        )}
      </button>
    </div>
  );
}
