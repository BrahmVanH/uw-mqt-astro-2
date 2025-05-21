import { HeadingBgColor, IconColor, type Config } from "@/types/weAreYourLocal";

const config: Config = {
  cards: [
    {
      title: "LOCAL PEOPLE",
      text: "More than 16,000 of our friends and neighbors were helped by the United Way of Marquette County partner agencies last year. That is 1 out of every 4 Marquette County residents.",
      icon: "fa-people-carry-box",
      headingBgColor: HeadingBgColor.YELLOW,
      iconColor: IconColor.YELLOW,
    },
    {
      title: "LOCAL DECISIONS",
      text: "Each year local volunteers evaluate the needs in our community, thoroughly review each agency and program applying for funding, identify which ones will best address those needs, and decides how available funds will be distributed.",
      icon: "fa-thumbs-up",
      headingBgColor: HeadingBgColor.BLUE,
      iconColor: IconColor.BLUE,
    },
    {
      title: "LOCAL SPENDING",
      text: "Give where you live! Your dollars stay local! United Way of Marquette County makes sure that contribution goes to the programs and services that help people in need in Marquette County.",
      icon: "fa-shop",
      headingBgColor: HeadingBgColor.RED,
      iconColor: IconColor.RED,
    },
  ],
};

export default config;