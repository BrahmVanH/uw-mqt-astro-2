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
          priority
          link
          text
          subtext
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
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature4 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature5 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature6 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature7 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature8 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature9 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature10 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature11 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature12 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature13 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature14 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature15 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature16 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature17 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature18 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature19 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
        feature20 {
          priority
          link
          linkText
          secondLink
          secondLinkText
          text
          subtext
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
