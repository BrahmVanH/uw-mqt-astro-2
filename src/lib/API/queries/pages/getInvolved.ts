import { gql } from "graphql-request";
import { howToContributeComponentQuery, impactStatisticsComponentQuery, ourImpactCarouselComponentQuery, partnersTickerComponentQuery } from "../common.js";

export const getInvolvedPageQuery = gql`
  query GetInvolvedPage {
    getInvolvedHeroes {
      nodes {
        getInvolvedHeroFields {
          text
          title
          bgMobile {
            node {
              sourceUrl(size: LARGE)
            }
          }
          bg {
            node {
              sourceUrl(size: LARGE)
            }
          }
        }
      }
    }
    ${partnersTickerComponentQuery}
    ${ourImpactCarouselComponentQuery}
    ${howToContributeComponentQuery} 
    ${impactStatisticsComponentQuery}
  }
`;
