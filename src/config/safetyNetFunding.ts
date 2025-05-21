import type { Config } from "@/types/safetyNetFunding";

import { APPLY_FOR_SAFETY_NET_FUNDING_URL } from "@/lib/constants";

const link = APPLY_FOR_SAFETY_NET_FUNDING_URL;
const safetyNetFundingPageUrl =
  "/our-impact/financial-security/safety-net-funding";

const content: Config = {
  title: "Safety Net Funding",
  text: "No one can anticipate an emergency or, better yet, an unexpected opportunity. With that in mind United Way of Marquette County has created the Safety Net Fund.\n\nThe Safety Net Fund will support local nonprofit agencies who provide direct support services in the community by filling an emergent and unexpected need in the organization. This may include expenses in response to emergency events or natural disasters, but also includes unexpected opportunities to advance agency programming not previously in the budget. The key factor is the unexpected nature of the needed funds.",
  link,
  linkText: "Apply now",
  link2: safetyNetFundingPageUrl,
};

export default content;
