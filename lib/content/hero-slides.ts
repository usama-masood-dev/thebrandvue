export type HeroSlideCta = {
  label: string;
  href: string;
};

export type HeroSlide = {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroSlideCta;
  secondaryCta?: HeroSlideCta;
};

/** Home hero slider — images in /public */
export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/hero1.jpg",
    eyebrow: "Empowering Global Business with AI Automation",
    title: "We Don't Just Build Software — We Build AI That Works for You",
    description:
      "We build intelligent AI agents and advanced AI-powered solutions that help businesses automate tasks, improve decision-making, and scale faster.",
    primaryCta: { label: "Schedule a Free Consultation", href: "#contact" },
    secondaryCta: { label: "See How We Innovate", href: "#portfolio" },
  },
  {
    id: "slide-2",
    image: "/hero2.jpg",
    eyebrow: "Your Vision, Our Innovation",
    title: "Software Solutions for Exceptional Customer Value",
    description:
      "Driving business success through valuable digital experiences — from strategy to launch and beyond.",
    primaryCta: { label: "Start Your Project", href: "#contact" },
    secondaryCta: { label: "View Our Work", href: "#portfolio" },
  },
  {
    id: "slide-3",
    image: "/hero3.jpg",
    eyebrow: "Web Development & Design",
    title: "Fast, Responsive Websites That Convert",
    description:
      "Modern, scalable web platforms built with cutting-edge technology and a focus on performance and UX.",
    primaryCta: { label: "Get a Free Quote", href: "#contact" },
    secondaryCta: { label: "Our Services", href: "#services" },
  },
  {
    id: "slide-4",
    image: "/hero4.jpg",
    eyebrow: "Digital Marketing That Delivers",
    title: "Grow Your Brand With Data-Driven Campaigns",
    description:
      "SEO, social, and paid media strategies designed to reach the right audience and maximize ROI.",
    primaryCta: { label: "Boost Your Reach", href: "#contact" },
    secondaryCta: { label: "Explore Services", href: "#services" },
  },
  {
    id: "slide-5",
    image: "/hero5.jpg",
    eyebrow: "Trusted by Ambitious Teams",
    title: "Technology Partners for Long-Term Success",
    description:
      "We collaborate closely with you to ship products on time, on budget, and aligned with your business goals.",
    primaryCta: { label: "Talk to Our Team", href: "#contact" },
    secondaryCta: { label: "Meet the Team", href: "#team" },
  },
  {
    id: "slide-6",
    image: "/hero6.png",
    eyebrow: "Results You Can Measure",
    title: "Transform Ideas Into Digital Reality",
    description:
      "From startups to enterprises — we deliver solutions that scale with your ambitions.",
    primaryCta: { label: "Schedule a Call", href: "#contact" },
    secondaryCta: { label: "See Case Studies", href: "#portfolio" },
  },
];
