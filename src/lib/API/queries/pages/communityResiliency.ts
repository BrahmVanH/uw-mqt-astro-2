import { gql } from "graphql-request";
import { aliceReportContentQuery, howToContributeComponentQuery, ourImpactCarouselComponentQuery } from "../common";
import { fourPillarsHeroComponentQuery } from "./ourImpact";

// GraphQL query string for the Community Resiliency page
export const communityResiliencyPageQuery = gql`
  query communityResiliencyPage {
    ${fourPillarsHeroComponentQuery}
    
    ${ourImpactCarouselComponentQuery}
    ${aliceReportContentQuery}
    ${howToContributeComponentQuery}
  }
`;
