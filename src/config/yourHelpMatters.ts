import { type Config } from "@/types/yourHelpMatters";
import { WP_URL_SRVR, YOOPERS_UNITED_ROOT_URL } from "astro:env/server";
import { YOUR_HELP_MATTERS_COMPONENT_BG_URL_ENDPOINT } from "@/lib/constants";

const bgEndpoint = YOUR_HELP_MATTERS_COMPONENT_BG_URL_ENDPOINT;
const wpUrl = WP_URL_SRVR;
const bgUrl = `${wpUrl}${bgEndpoint}`;
const content: Config = {
  mainHeading: {
    first: "EVERY",
    second: "CONTRIBUTION",
    third: "YOU MAKE",
  },

  paragraph:
    "to your community strengthens both you and all of those around you. When you make a contribution with the United Way, we help direct and exact your effort where it is needed most.",
  bgUrl: bgUrl,
  link: YOOPERS_UNITED_ROOT_URL ?? "/get-involved",
  linkText: "Get Involved",
};

export default content;
