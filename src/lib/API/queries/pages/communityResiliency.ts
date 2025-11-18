import { gql } from "graphql-request";
import { aliceReportContentQuery, howToContributeComponentQuery, ourImpactCarouselComponentQuery } from "../common.js";
import { fourPillarsHeroComponentQuery } from "./ourImpact.js";

// GraphQL query string for the Community Resiliency page
export const communityResiliencyPageQuery = gql`
  query communityResiliencyPage {
    ${fourPillarsHeroComponentQuery}
    
    ${ourImpactCarouselComponentQuery}
    ${aliceReportContentQuery}
    ${howToContributeComponentQuery}
  }
`;
