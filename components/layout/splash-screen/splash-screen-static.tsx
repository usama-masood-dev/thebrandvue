import { SplashScreenMarkup } from "./splash-screen-markup";

/** Server-rendered splash; shown via CSS when html has splash-pending. */
export function SplashScreenStatic() {
  return <SplashScreenMarkup id="splash-static" />;
}
