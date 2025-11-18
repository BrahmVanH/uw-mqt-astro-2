import { gql } from "graphql-request";
import { faqsComponentQuery, ourImpactCarouselComponentQuery } from "../common.js";
// GraphQL query string for the Individuals page hero component
export const individualsPageHeroComponentQuery = gql`
individualsPageHeroes {
  nodes {
    individualsPageHeroFields {
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
      text
      title
    }
  }
}
`;


export const individualsPageQuery = gql`
  query IndividualsPage {
    ${individualsPageHeroComponentQuery}
    ${ourImpactCarouselComponentQuery}
    ${faqsComponentQuery}
  }
`;