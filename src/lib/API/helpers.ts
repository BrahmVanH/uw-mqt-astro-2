import {
  communityResiliencyPageQuery,
  financialSecurityPageQuery,
  youthOpportunityPageQuery,
  healthyCommunityPageQuery,
  homePageQuery,
  ourImpactPageQuery,
  campaignToolkitPageQuery,
  valuesHistoryPageQuery,
  ourCulturePageQuery,
  ourLeadershipPageQuery,
  individualsPageQuery,
  getInvolvedPageQuery,
  partnerPageQuery,
  agenciesPageQuery,
} from "./queries";

export const getContentQuery = (path: string) => {
  if (path !== "/") path = removeTrailingSlash(path);

  switch (path) {
    case "/":
      return homePageQuery;
    case "/get-involved/partner":
      return partnerPageQuery;
    case "/our-impact":
      return ourImpactPageQuery;
    case "/our-impact/healthy-community":
      return healthyCommunityPageQuery;
    case "/our-impact/financial-security":
      return financialSecurityPageQuery;
    case "/our-impact/community-resiliency":
      return communityResiliencyPageQuery;
    case "/our-impact/youth-opportunity":
      return youthOpportunityPageQuery;
    case "/get-involved/partner/campaign-toolkit":
      return campaignToolkitPageQuery;
    case "/about/values-history":
      return valuesHistoryPageQuery;
    case "/about/our-culture":
      return ourCulturePageQuery;
    case "/about/our-leadership":
      return ourLeadershipPageQuery;
    case "/get-involved":
      return getInvolvedPageQuery;
    case "/get-involved/individuals":
      return individualsPageQuery;
    case "get-involved/partner/agencies":
      return agenciesPageQuery;
    default:
      return homePageQuery;
  }
};

const removeTrailingSlash = (path: string) => {
  return path.replace(/\/$/, "");
};

export function getProxiedImageUrl(url: string): string {
  if (typeof url !== "string") return url;

  // Ensure URL has https:// prefix
  const replaced = url.replace(/api\.uwmqt\.org/g, "uwmqt.org");
  return replaced;
}
