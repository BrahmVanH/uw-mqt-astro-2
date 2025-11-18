import { gql } from "graphql-request";
import { partnersTickerComponentQuery } from "../common.js";

export const agenciesPageQuery = gql`
  query AgenciesPage {
    ${partnersTickerComponentQuery}
  }
`;