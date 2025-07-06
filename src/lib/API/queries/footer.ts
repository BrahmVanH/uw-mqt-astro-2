import { gql } from "graphql-request";

export const footerQuery = /* GraphQL */ gql`
  query FooterQuery {
    current990FormPdfs {
      nodes {
        current990FormPDFFields {
          pdfFile {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    donorPrivacyPolicyPdfs {
      nodes {
        donorPrivacyPolicyPDFFields {
          pdfFile {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    giftAcceptancePolicyPdfs {
      nodes {
        giftAcceptancePolicyPDFFields {
          pdfFile {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    adminCostPdfs {
      nodes {
        adminCostsPDFFields {
          pdfFile {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
    uwContactInfos {
      nodes {
        uWContactInformationFields {
          facebookLink
          fieldGroupName
          googleMapsUrl
          instagramLink
          linkedinLink
          phoneNumber
          state
          streetAddress
          zip
          city
        }
      }
    }
  }
`;