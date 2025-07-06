import { gql } from "graphql-request";

export const valuesHistoryPageQuery = gql`
  query ValuesHistory {
    valuesHistories {
      nodes {
        valuesAndHistoryFields {
          image1 {
            node {
              sourceUrl(size: LARGE)

              mediaDetails {
                height
                width
              }
            }
          }
          image2 {
            node {
              sourceUrl(size: LARGE)

              mediaDetails {
                height
                width
              }
            }
          }
          image3 {
            node {
              sourceUrl(size: LARGE)

              mediaDetails {
                height
                width
              }
            }
          }
          imageAlt1
          imageAlt2
          imageAlt3
        }
      }
    }
  }
`;