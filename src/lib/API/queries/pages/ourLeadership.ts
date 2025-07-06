import { gql } from "graphql-request";
import { OUR_LEADERSHIP_PAGE_IMG_ONE_TITLE, OUR_LEADERSHIP_PAGE_IMG_TWO_TITLE, OUR_LEADERSHIP_PAGE_IMG_THREE_TITLE } from '@/lib/constants';


export const ourLeadershipPageQuery = gql`
  query OurLeadershipPage {
    mediaItem1: mediaItems(where: { title: "${OUR_LEADERSHIP_PAGE_IMG_ONE_TITLE}" }) {
      nodes {
        mediaItemUrl
        altText
        mediaDetails {
          height
          width
        }
      }
    }
    mediaItem2: mediaItems(where: { title: "${OUR_LEADERSHIP_PAGE_IMG_TWO_TITLE}" }) {
      nodes {
        mediaItemUrl
        altText
        mediaDetails {
          height
          width
        }
      }
    }
    mediaItem3: mediaItems(where: { title: "${OUR_LEADERSHIP_PAGE_IMG_THREE_TITLE}" }) {
      nodes {
        mediaItemUrl
        altText
        mediaDetails {
          height
          width
        }
      }
    }
  }
`;