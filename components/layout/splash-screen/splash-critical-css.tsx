import { SPLASH_EXITING_CLASS, SPLASH_PENDING_CLASS } from "./constants";

/** Inline styles so the splash wins the first paint before globals.css loads. */
export function SplashCriticalCss() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
html.${SPLASH_PENDING_CLASS},
html.${SPLASH_PENDING_CLASS} body {
  overflow: hidden;
  background: #05080e;
}
html.${SPLASH_PENDING_CLASS} #site-content {
  opacity: 0;
  pointer-events: none;
}
html.${SPLASH_PENDING_CLASS}.${SPLASH_EXITING_CLASS} #site-content {
  opacity: 1;
  transition: opacity 0.6s ease-out;
}
#splash-static {
  display: none;
}
html.${SPLASH_PENDING_CLASS} #splash-static {
  display: flex;
}
        `.trim(),
      }}
    />
  );
}
