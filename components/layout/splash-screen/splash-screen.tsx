"use client";

import { useEffect } from "react";
import {
  SPLASH_EXITING_CLASS,
  SPLASH_PENDING_CLASS,
  SPLASH_STORAGE_KEY,
} from "./constants";

const MIN_VISIBLE_MS = 1400;
const EXIT_MS = 600;
const MAX_WAIT_MS = 4500;

function clearSplashClasses() {
  document.documentElement.classList.remove(SPLASH_PENDING_CLASS, SPLASH_EXITING_CLASS);
}

/** Drives exit timing on the server-rendered #splash-static overlay. */
export function SplashScreen() {
  useEffect(() => {
    const staticSplash = document.getElementById("splash-static");

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SPLASH_STORAGE_KEY) === "1";
    } catch {
      alreadySeen = true;
    }

    if (alreadySeen) {
      clearSplashClasses();
      staticSplash?.remove();
      return;
    }

    if (!document.documentElement.classList.contains(SPLASH_PENDING_CLASS)) {
      document.documentElement.classList.add(SPLASH_PENDING_CLASS);
    }

    if (!staticSplash) {
      clearSplashClasses();
      return;
    }

    document.body.style.overflow = "hidden";
    const startedAt = Date.now();
    let finished = false;

    const beginExit = () => {
      if (finished) return;
      finished = true;

      const elapsed = Date.now() - startedAt;
      const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);

      window.setTimeout(() => {
        document.documentElement.classList.add(SPLASH_EXITING_CLASS);
        staticSplash.classList.add("splash-root--exit");

        window.setTimeout(() => {
          try {
            sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
          clearSplashClasses();
          staticSplash.remove();
          document.body.style.overflow = "";
        }, EXIT_MS);
      }, delay);
    };

    if (document.readyState === "complete") {
      beginExit();
    } else {
      window.addEventListener("load", beginExit, { once: true });
    }

    const safetyTimer = window.setTimeout(beginExit, MAX_WAIT_MS);

    return () => {
      window.removeEventListener("load", beginExit);
      window.clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
