import { gql } from "graphql-request";
import { howToContributeComponentQuery, ourImpactCarouselComponentQuery, partnersTickerComponentQuery } from "../common.js";

export const partnerPageQuery = gql`
 query PartnerPage {
 partnerPageHeroes {
    nodes {
      partnerPageHeroFields {
        text
        title
        bg {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
        bgMobile {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
      }
    }
  }
  ${partnersTickerComponentQuery}
  ${ourImpactCarouselComponentQuery}
  ${howToContributeComponentQuery}
 }
 `;
