import type { Config } from "@/types/donate";
import {
  DONATE_CHARITABLE_STOCK_URL,
  DONATE_CRYPTO_URL,
  DONATE_QCD_URL,
} from "astro:env/server";

const config: Config = {
  title: "Donate",
  heading: "Investing in Marquette County\n#KeepingItLocal ",
  leadershipLevelsTable: {
    title: "Leadership Levels for monthly giving (starting at):",
    columns: [
      {
        level: "Bronze",
        annualGiftAmount: "$500-$749",
        minimumGiftAmount: "$41.67",
        monthlyGiftIncludingFees: "$42.92",
      },
      {
        level: "Silver",
        annualGiftAmount: "$750-$999",
        minimumGiftAmount: "$62.50",
        monthlyGiftIncludingFees: "$64.38",
      },
      {
        level: "Gold",
        annualGiftAmount: "$1,000-$1,499",
        minimumGiftAmount: "$83.34",
        monthlyGiftIncludingFees: "$85.34",
      },
      {
        level: "Chairman's Club",
        annualGiftAmount: "$1,500-$2,499",
        minimumGiftAmount: "$125",
        monthlyGiftIncludingFees: "$128.75",
      },
      {
        level: "Ambassador",
        annualGiftAmount: "$2,500+",
        minimumGiftAmount: "$208.34",
        monthlyGiftIncludingFees: "$214.59",
      },
    ],
  },
  moreOptions: [
    {
      heading: "Qualified Charitable Distributions",
      text: "Qualified Charitable Distributions (QCDs), also known as IRA Charitable Rollovers, are the savviest way for individuals age 70½ or older to use their IRAs to maximize their charitable impact.\n\n\nWhether you want to make a QCD gift to United Way today, request a tax acknowledgment letter for a gift already made, or just learn more about QCDs, you can find resources for each below.",
      link: DONATE_QCD_URL,
      linkText: "Start Your QCD Gift",
    },
    {
      heading: "Charitable Stock Gifts",
      subheading:
        "See combined tax savings of up to 70% of your gift, when you donate appreciated stocks or mutual funds.",
      text: "Donating appreciated assets avoids federal capital gains taxes and provides a federal income tax deduction for the current market value of the gift. Similar state tax benefits are also provided in most of the country.",
      link: DONATE_CHARITABLE_STOCK_URL,
      linkText: "Start your Charitable Stock Gift",
    },
    {
      heading: "Donate Crypto",
      text: "Cryptocurrency donations are processed by FreeWill Impact Fund, and Crypto for Charity, and the net proceeds are promptly sold and transferred to United Way of Marquette County in U.S. dollars. We do not maintain a reserve of cryptocurrency, therefore all crypto donations to UWMC are final.",
      link: DONATE_CRYPTO_URL,
      linkText: "Donate Crypto",
    },
  ],
};

export default config;
