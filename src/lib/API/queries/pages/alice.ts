import { gql } from "graphql-request";



const foodPantries = gql`
foodPantries {
  nodes {
    foodPantryFields {
      address {
        city
        po
        state
        street
        zip
      }
      contact {
        email
        name
        phone
      }
      donate {
        link
        message
      }
      email
      flags
      geo {
        lat
        lng
      }
      hoursSimple
      hoursType
      name
      website
      phone
    }
  }
}`

const hubPrograms = gql`
  aliceHubPrograms(first: 100) {
    nodes {
      aliceHubProgramFields {
        category
        description
        link
        name
        provider
        requirements
        serviceAreas
        type
      }
    }
  }
`

const aliceStats = gql`
  allAliceStats {
    nodes {
      aliceStatsFields {
        content {
          heading
          linkText
          link
          listItem1
          listItem2
          listItem3
          popoverText
          text2
          text3
          textWithPopover
        }
        countyStats {
          baraga {
            aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          alger {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          chippewa {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          schoolcraft {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          overall {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          ontonagon {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          menominee {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          marquette {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          mackinac {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          luce {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          kewenaw {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          iron {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          houghton {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          goegebic {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          delta {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
          dickinson {
                aboveAlice
            belowAlice
            belowFpl
            fieldGroupName
            percentAboveAlice
            percentBelowAlice
            percentBelowFpl
            totalHouseholds
          }
        }
      }
    }
  
}`


export const alicePageQuery = gql`
  query AlicePageQuery {
    ${aliceStats}
    ${hubPrograms}
    aliceReportPdfs {
    nodes {
      aLICEReportPDFFields {
        pdfFile {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
  }
`