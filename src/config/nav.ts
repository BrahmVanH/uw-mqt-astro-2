import type { Config } from "@/types/nav";
import { MOBILE_FOOD_PANTRY_SCHEDULE_URL } from "@/lib/constants";

const config: Config = {
  commonStyles: {
    navContent: "p-4 w-full grid grid-cols-2 gap-1",
    navContentLeft: "col-span-1 border-r-primary-blue-2 border-r-2",
    navContentRight: "space-y-1 col-span-1 text-nowrap p-2 xl:text-md",
    navHeading: "text-lg lg:text-xl font-semibold mb-4",
    navTrigger:
      "text-sm xl:text-md font-bold p-2 h-min lg:hover:no-underline lg:hover:bg-white",
    accordionContent:
      "absolute right-full top-0 min-w-[200px] bg-white shadow-lg rounded-none p-2 ",
  },
  navTabs: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Get Involved",
      href: "/get-involved",
      navTabs: [
        {
          title: "Individuals",
          href: "/get-involved/individuals",
        },
        {
          title: "Businesses & Groups",
          href: "/get-involved/partner",
          navTabs: [
            {
              title: "Campaign Toolkit",
              href: "/get-involved/partner/campaign-toolkit",
            },
          ],
        },
      ],
    },
    {
      title: "Our Impact",
      href: "/our-impact",
      navTabs: [
        {
          title: "Youth Opportunity",
          href: "/our-impact/youth-opportunity",
        },
        {
          title: "Community Resiliency",
          href: "/our-impact/community-resiliency",
        },
        {
          title: "Healthy Community",
          href: "/our-impact/healthy-community",
          navTabs: [
            {
              title: "Mobile Food Pantry Schedule",
              href: MOBILE_FOOD_PANTRY_SCHEDULE_URL,
            },
          ],
        },
        {
          title: "Financial Security",
          href: "/our-impact/financial-security",
          navTabs: [
            {
              title: "Single Care Service",
              href: "/our-impact/financial-security/single-care-service",
            },
            {
              title: "Safety Net Funding",
              href: "/our-impact/financial-security/safety-net-funding",
            },
          ],
        },
      ],
    },
    {
      title: "About Us",
      href: "/about/our-leadership",
      navTabs: [
        {
          title: "Our Culture",
          href: "/about/our-culture",
        },
        {
          title: "Our Leadership",
          href: "/about/our-leadership",
        },
        {
          title: "Our Values & History",
          href: "/about/values-history",
        },
      ],
    },
  ],
  helpfulLinks: [
    {
      title: "United for ALICE",
      href: "/united-for-alice",

    }
  ]
};

export default config;
