import { gql } from "graphql-request";
import { aliceReportContentQuery, howToContributeComponentQuery, vitaTaxPrepComponentQuery } from "../common.js";
import { fourPillarsHeroComponentQuery } from "./ourImpact.js";

// GraphQL query string for the Financial Security page
export const financialSecurityPageQuery = gql`
  query financialSecurityPage {
    ${vitaTaxPrepComponentQuery}
${fourPillarsHeroComponentQuery}
    ${aliceReportContentQuery}
    ${howToContributeComponentQuery} 
  }
`;
