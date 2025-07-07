import type { Config } from "@/types/aliceReport";
import { ALICE_INTERACTIVE_REPORT_URL } from "@/lib/constants";

const config: Config = {
  title: "Alice Report",
  heading: "What is the 'Alice' Report?",
  subheading: "Asset-Limited, Income-Constrained, Employed ",
  text: "It is a complex term for a population we know too well. ALICE is working hard, but barely surviving and definitely not thriving. ALICE is part of our economic engine but ALICE is struggling. ALICE may be a college student, working and going to school hoping for a better life or a senior citizen making a difficult choice between food, housing and prescriptions. ALICE could be a working dad, with childcare, transportation and housing costs that leave very little to provide shoes for his children. ALICE is many of us. ",
  aliceStats: {
    text: "Of Michigan's 4,076,984 households in 2023…",
    stats: [
      "14% earned below the Federal Poverty Level (FPL)",
      "27% were ALICE, in households that earned above the FPL but not enough to afford the basics in the communities where they live",
      "Together, 41% of households in Michigan were below the ALICE Threshold (poverty + ALICE divided by total households)",
    ],
  },
  linkText1: "Full Report PDF",
  link2: ALICE_INTERACTIVE_REPORT_URL,
  linkText2: "Visit the interactive report",
};

export default config;
