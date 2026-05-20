import { SPLASH_PENDING_CLASS, SPLASH_STORAGE_KEY } from "./constants";

/**
 * Runs synchronously at the start of <body> so the splash class is applied
 * before the rest of the document is painted.
 */
export function SplashBlockingScript() {
  const script = `
(function () {
  try {
    if (sessionStorage.getItem(${JSON.stringify(SPLASH_STORAGE_KEY)}) === "1") return;
  } catch (e) {}
  document.documentElement.classList.add(${JSON.stringify(SPLASH_PENDING_CLASS)});
})();
`.trim();

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
