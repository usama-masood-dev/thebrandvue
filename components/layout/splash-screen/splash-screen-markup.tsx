import Image from "next/image";
import { brandLogoDark, BRAND_NAME } from "@/lib/brand";

type SplashScreenMarkupProps = {
  id?: string;
  exiting?: boolean;
};

export function SplashScreenMarkup({ id, exiting = false }: SplashScreenMarkupProps) {
  return (
    <div
      id={id}
      className={`splash-root fixed inset-0 z-[100] flex items-center justify-center bg-surface-dark ${
        exiting ? "splash-root--exit pointer-events-none" : ""
      }`}
      role="presentation"
      aria-hidden={exiting}
    >
      <div className="splash-logo-wrap px-6">
        <Image
          src={brandLogoDark}
          alt={BRAND_NAME}
          width={260}
          height={84}
          priority
          fetchPriority="high"
          className="h-auto w-[min(68vw,260px)]"
        />
      </div>
    </div>
  );
}
