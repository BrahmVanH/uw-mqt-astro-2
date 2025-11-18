import { gql } from "graphql-request";
import { fourPillarsHeroComponentQuery } from "./ourImpact.js";
import { howToContributeComponentQuery } from "../common.js";

// GraphQL query string for the Healthy Community page
export const healthyCommunityPageQuery = gql`
  query HealthyCommunityPage {
    ${fourPillarsHeroComponentQuery}
    mobileFoodPantryComponents {
      nodes {
        mobileFoodPantryComponentFields {
          buttonText
          link
          text
          title
          image {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          bgMobile {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
        }
      }
    }
    ${howToContributeComponentQuery}
  }
`;