import { gql } from "graphql-request";
import { girlScoutsComponentQuery, howToContributeComponentQuery, northwoodsAirLifelineComponentQuery, ourImpactCarouselComponentQuery } from "../common.js";
import { fourPillarsHeroComponentQuery } from "./ourImpact";

// GraphQL query string for the Youth Opportunity page
export const youthOpportunityPageQuery = gql`
  query youthOpportunityPage {
${fourPillarsHeroComponentQuery}
    ymcaComponents {
      nodes {
        yMCAComponentFields {
          brandImg {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          image {
            node {
              altText
              sourceUrl(size: LARGE)
            }
          }
          link1
          link2
          linkText1
          text
          linkText2
          title
        }
      }
    }
    ${girlScoutsComponentQuery}
    ${northwoodsAirLifelineComponentQuery}
    ${ourImpactCarouselComponentQuery}
    ${howToContributeComponentQuery}
  }
`;