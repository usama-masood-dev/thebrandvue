import Image from "next/image";
import Link from "next/link";
import { brandLogoDark, brandLogoLight, BRAND_NAME } from "@/lib/brand";

type HeaderLogoProps = {
  className?: string;
  /** `dark` = logo for dark backgrounds (hero). `light` = logo for light backgrounds. */
  variant?: "light" | "dark";
};

export function HeaderLogo({ className, variant = "light" }: HeaderLogoProps) {
  const logo = variant === "dark" ? brandLogoDark : brandLogoLight;

  return (
    <Link
      href="/"
      className={`relative block shrink-0 ${className ?? ""}`}
      aria-label={`${BRAND_NAME} home`}
    >
      <Image
        src={logo}
        alt={BRAND_NAME}
        width={200}
        height={64}
        priority
        className="h-auto w-[140px] max-w-[42vw] sm:w-[170px] md:w-[200px]"
      />
    </Link>
  );
}
