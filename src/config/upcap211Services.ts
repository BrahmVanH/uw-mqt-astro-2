import type { Config } from "@/types/upcap211Services";
import { WP_URL_SRVR as WP_URL } from "astro:env/server";
import {
  UPCAP_211_SERVICE_GRAPHIC_URL_ENDPOINT,
  UPCAP_211_SERVICES_URL,
} from "@/lib/constants";
const wpUrl = WP_URL;
const imgEndpoint = UPCAP_211_SERVICE_GRAPHIC_URL_ENDPOINT;
const imgUrl = `${wpUrl}${imgEndpoint}`;

const content: Config = {
  heading: "Upper Peninsula 211 ",
  subheading:
    "Get connected to the help you need - quickly, easily and confidentially.",
  text: "When there’s a crisis, where do you turn? If it’s a life-threatening emergency, you call 911. But what if you can’t pay your electric bill? Or you need childcare? Or legal help? Now you call or text 211.21\n\n1 is the one number you call or text to get answers to life’s many challenges. And United Way makes it possible.\n\nUnited Way has partnered with area organizations and companies who offer free or discounted social services to provide you a fast, easy way to get the specific help you need…as quickly as possible!",
  link: UPCAP_211_SERVICES_URL,
  img: imgUrl,
  imgAlt: "211 Services graphic",
};

export default content;
