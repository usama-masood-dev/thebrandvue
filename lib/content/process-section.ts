export type ProcessStepContent = {
  number: string;
  title: string;
  description: string;
};

export const processSectionContent = {
  eyebrow: "How we work",
  title: "From Idea to",
  titleAccent: "Impact",
  steps: [
    {
      number: "01",
      title: "Idea Discovery",
      description:
        "We understand your goals, needs, and vision through detailed consultation and research.",
    },
    {
      number: "02",
      title: "Smart Planning",
      description:
        "We craft a clear strategy, timeline, and design direction tailored to your project.",
    },
    {
      number: "03",
      title: "Creative Execution",
      description:
        "Our team designs, develops, and produces with creativity, precision, and attention to detail.",
    },
    {
      number: "04",
      title: "Successful Launch",
      description:
        "We deliver, deploy, and support your project for long-term success.",
    },
  ] satisfies ProcessStepContent[],
} as const;
