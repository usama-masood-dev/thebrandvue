"use client";

import { useEffect, useState } from "react";
import { SimpleHeader } from "./simple-header";
import { StickyHeader } from "./sticky-header";

const SCROLL_THRESHOLD = 48;

/** Home page: transparent simple header over hero + sticky header on scroll */
export function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SimpleHeader hidden={scrolled} />
      <StickyHeader visible={scrolled} />
    </>
  );
}
