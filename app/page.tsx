import { HomeHeader } from "@/components/layout/header";
import { HeroSlider } from "@/components/sections/hero";
import { heroSlides } from "@/lib/content/hero-slides";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <HeroSlider slides={heroSlides} />
    </>
  );
}
