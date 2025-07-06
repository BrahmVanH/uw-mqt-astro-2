import { gql } from "graphql-request";
import { partnersTickerComponentQuery } from "../common";

export const agenciesPageQuery = gql`
  query AgenciesPage {
    ${partnersTickerComponentQuery}
  }
`;