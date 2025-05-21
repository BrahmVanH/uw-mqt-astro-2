import { YOOPERS_UNITED_ROOT_URL } from "astro:env/server";
import {
  YOOPERS_UNITED_NEEDS_PAGE_ENDPOINT,
  YOOPERS_UNITED_NEED_DETAILS_ROUTE,
} from "@/lib/constants";
import type { Config } from "@/types/volunteerNeeds";
const needsPageUrl = `${YOOPERS_UNITED_ROOT_URL}${YOOPERS_UNITED_NEEDS_PAGE_ENDPOINT}`;
const needDetailsUrl = `${YOOPERS_UNITED_ROOT_URL}${YOOPERS_UNITED_NEED_DETAILS_ROUTE}`;

const config: Config = {
  preHeading: "Make a Difference",
  heading: "Make A Difference Right Now",
  subHeading:
    "Visit our volunteer needs page to see where your help is needed the most in Marquette County.",
  volunteerNeedsLinkText: "All Volunteer Needs",
  volunteerNeedsLink: needsPageUrl,
  viewNeedDetailsLinkRoot: needDetailsUrl,
};

export default config;
