import { gql } from "graphql-request";
import { OUR_CULTURE_PAGE_IMG_ONE_TITLE, OUR_CULTURE_PAGE_IMG_TWO_TITLE } from '@/lib/constants';

export const ourCulturePageQuery = gql`
  query OurCulturePage {
    mediaItem1: mediaItems(where: { title: "${ OUR_CULTURE_PAGE_IMG_ONE_TITLE }" }) {
      nodes {
        mediaItemUrl
        altText
        mediaDetails {
          height
          width
        }
      }
    }
    mediaItem2: mediaItems(where: { title: "${OUR_CULTURE_PAGE_IMG_TWO_TITLE}" }) {
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