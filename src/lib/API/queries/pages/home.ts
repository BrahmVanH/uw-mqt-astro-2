import { gql } from "graphql-request";
import { howToContributeComponentQuery, impactStatisticsComponentQuery, ourImpactCarouselComponentQuery, partnersTickerComponentQuery } from "../common";

// GraphQL query string for the Home page
export const homePageQuery = gql`
  query HomePage {
    homePageHeroes {
    nodes {
      homePageHeroFields {
        bg {
          node {
            sourceUrl(size: LARGE)
          }
        }
        bgMobile {
          node {
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
        feature1 {
          link
          text
          linkText
          secondLink
          secondLinkText
          title
          image {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          optionalMedia {
            node {
              mediaItemUrl
            }
          }
          optionalMediaLabel

        }
        feature2 {
          link
          linkText
          secondLink
          secondLinkText
          text
          title
          image {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          optionalMedia {
            node {
              mediaItemUrl
            }
          }
          optionalMediaLabel

         
        }
        feature3 {
          link
          linkText
          secondLink
          secondLinkText
          text
          title
          image {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          optionalMedia {
            node {
              mediaItemUrl
            }
          }
          optionalMediaLabel
        }
        heading
        subheading
      }
    }
  }
    ${partnersTickerComponentQuery}
    ${ourImpactCarouselComponentQuery}
    ${howToContributeComponentQuery}
    ${impactStatisticsComponentQuery}
  }
`;
