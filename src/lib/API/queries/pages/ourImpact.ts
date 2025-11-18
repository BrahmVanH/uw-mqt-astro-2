import { gql } from "graphql-request";
import { faqsComponentQuery, howToContributeComponentQuery, impactStatisticsComponentQuery, ourImpactCarouselComponentQuery } from "../common.js";

// GraphQL query string for the frequently asked questions component
export const fourPillarsHeroComponentQuery = gql`
fourPillarsHeroComponents {
    nodes {
      fourPillarsHeroComponentFields {
        communityResiliency {
          text
          title
          bgMobile {
            node {
              altText
              sourceUrl
            }
          }
          bg {
            node {
              altText
              sourceUrl
            }
          }
        }
        financialSecurity {
          text
          title
          bg {
            node {
              altText
              sourceUrl
            }
          }
          bgMobile {
            node {
              altText
              sourceUrl
            }
          }
        }
        healthyCommunity {
          text
          title
          bg {
            node {
              altText
              sourceUrl
            }
          }
          bgMobile {
            node {
              altText
              sourceUrl
            }
          }
        }
        youthOpportunity {
          text
          title
          bg{
            node {
              altText
              sourceUrl
            }
          }
          bgMobile {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }`;



//  GraphQL query string for the Our Impact page
export const ourImpactPageQuery = gql`
  query OurImpactPage {
    heroComponentOurImpactPages {
      nodes {
        heroComponentFields {
          text
          title
          bgMobile {
            node {
              altText
              sourceUrl(size: LARGE)
            }
          }

          bg {
            node {
              altText
              sourceUrl(size: LARGE)
            }
          }
        }
      }
    }
    fourPillarsPreviews {
      nodes {
        fourPillarsPreviewFields {
          pillars {
            communityResiliencyText
            communityResiliencyTitle
            communityResiliencyBg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            communityResiliencyImg {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
            communityResiliencyLink
            financialSecurityBg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            financialSecurityImg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            financialSecurityLink
            financialSecurityText
            financialSecurityTitle
            healthyCommunityBg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            healthyCommunityImg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            healthyCommunityLink
            healthyCommunityText
            healthyCommunityTitle
            youthOpportunityBg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            youthOpportunityImg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            youthOpportunityLink
            youthOpportunityText
            youthOpportunityTitle
          }
        }
      }
    }
    ${ourImpactCarouselComponentQuery}
    ${howToContributeComponentQuery}
    ${impactStatisticsComponentQuery}
    ${faqsComponentQuery}
  }
`;