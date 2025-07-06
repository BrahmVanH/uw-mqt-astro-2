import { gql } from "graphql-request";

export const campaignToolkitPageQuery = gql`
  query CampaignToolkitPageQuery {
    campaignToolkitAssets {
      nodes {
        campaignToolkitAssetFields {
          pledgeForm {
            node {
              mediaItemUrl
            }
          }
          radioPsaAudio {
            node {
              mediaItemUrl
            }
          }
          radioPsaTranscript {
            node {
              mediaItemUrl
            }
          }
          workplacePacket {
            node {
              mediaItemUrl
            }
          }
          collageImages {
            image1 {
              node {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            image2 {
              node {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            image3 {
              node {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            image4 {
              node {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            image5 {
              node {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            image6 {
              node {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            image7 {
              node {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;
