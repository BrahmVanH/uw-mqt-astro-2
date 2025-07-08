import { gql } from "graphql-request";

import {
  OUR_CULTURE_PAGE_IMG_ONE_TITLE,
  OUR_CULTURE_PAGE_IMG_TWO_TITLE,
  OUR_LEADERSHIP_PAGE_IMG_THREE_TITLE,
  OUR_LEADERSHIP_PAGE_IMG_ONE_TITLE,
  OUR_LEADERSHIP_PAGE_IMG_TWO_TITLE,
} from "@/lib/constants";
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

export const valuesHistoryPageQuery = gql`
  query ValuesHistory {
    valuesHistories {
      nodes {
        valuesAndHistoryFields {
          image1 {
            node {
              sourceUrl(size: LARGE)

              mediaDetails {
                height
                width
              }
            }
          }
          image2 {
            node {
              sourceUrl(size: LARGE)

              mediaDetails {
                height
                width
              }
            }
          }
          image3 {
            node {
              sourceUrl(size: LARGE)

              mediaDetails {
                height
                width
              }
            }
          }
          imageAlt1
          imageAlt2
          imageAlt3
        }
      }
    }
  }
`;

const seniorCenterComponentQuery = gql`
seniorCenters {
    nodes {
      seniorCenterFields {
        img {
          node {
            altText
            sourceUrl
          }
        }
        link
        linkText
        text
        title
      }
    }
  }
`;

export const girlScoutsComponentQuery = gql`
girlScoutsComponents {
  nodes {
    girlScoutsComponentFields {
      bg {
        node {
          altText
          sourceUrl(size: LARGE)
        }
      }
      image1 {
        node {
          altText
          sourceUrl(size: LARGE)
        }
      }
      image2 {
        node {
          altText
          sourceUrl(size: LARGE)
        }
      }
      link1
      link2
      linkText1
      linkText2
      title
      text
    }
  }
}
`;

const impactStatisticsComponentQuery = gql`
impactStatistics {
  nodes {
    ourImpactStatisticFields {
      gallery {
        image1 {
          node {
            sourceUrl(size: THUMBNAIL)
            altText
          }
        }
        image2 {
          node {
            sourceUrl(size: THUMBNAIL)
            altText
          }
        }
        image3 {
          node {
            sourceUrl(size: THUMBNAIL)
            altText
          }
        }
        link1
        link2
        link3
        text1
        text2
        text3
      }
      stats {
        unit1
        value1
        unit2
        value2
        unit3
        value3
        unit4
        value4
        unit5
        value5
        unit6
        value6
        text1
        text2
        text3
        text4
        text5
        text6
      }
    }
  }
}
`;

// graphql queries for vita tax prep component
const vitaTaxPrepComponentQuery = gql`
  vitaTaxPreps {
    nodes {
      vITATaxPrepFields {
        image {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
        link
        linkText
        linkTextTwo
        linkTwo
        text
        title
      }
    }
  }
  
`;

// graphql queries for northwoods air lifeline component
const northwoodsAirLifelineComponentQuery = gql`

northwoodsAirLifelines {
    nodes {
      northwoodsAirLifelineFields {
        bg {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
        link
        linkText
        text
        title
        image {
          node {
            altText
            sourceUrl(size: LARGE)
         
          }
        }
      }
    }
  }
`;

// GraphQL query string for the frequently asked questions component
const howToContributeComponentQuery = gql`
howToContributeComponents {
      nodes {
        howToContributeComponentFields {
          donate {
            link
            text
            title
          }
          individuals {
            link
            text
            title
          }
          partners {
            link
            text
            title
          }
        }
      }
    }
`;

// GraphQL query string for the frequently asked questions component
export const ourImpactCarouselComponentQuery = gql`
      impactCarousels {
    nodes {
      impactCarouselFields {
        bgImg {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
        carouselItems {
          item1 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          }
          item2 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          }
          item3 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          }
          item4 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          } 
          item5 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          } 
          item6 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
          } 
          item7 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          } 
          item8 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          } 
          item9 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          } 
          item10 {
            image {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
                link
            linkText
            text
            title
          } 
          
        }
    }
  }
}
  
`;

// GraphQL query string for the Alice Report component
const aliceReportContentQuery = gql`
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
`;
// GraphQL query string for the Individuals page hero component
export const individualsPageHeroComponentQuery = gql`
individualsPageHeroes {
  nodes {
    individualsPageHeroFields {
      bg {
        node {
          altText
          sourceUrl(size: LARGE)
        }
      }
      bgMobile {
      node {
        altText
        sourceUrl(size: LARGE)
      }
    }
      text
      title
    }
  }
}
`;

// GraphQL query string for the Partners Ticker component

const partnersTickerComponentQuery = gql`
 partnersTickerItems(first: 100) {
      nodes {
        partnersTickerItemFields {
          brandImg {
            node {
              sourceUrl(size: MEDIUM)
              altText
            }
          }
          link
          name
          title
        }
      }
    }
`;

// GraphQL query string for the frequently asked questions component
const faqsComponentQuery = gql`
faqs {
    nodes {
      fAQFields {
        sectionTitle
        questions {
          answer1
          answer10
          answer2
          answer3
          answer4
          answer5
          answer6
          answer9
          answer8
          answer7
          question10
          question1
          question2
          question3
          question4
          question5
          question6
          question7
          question8
          question9
        }
      }
    }
  }
`;

// GraphQL query string for the frequently asked questions component
const fourPillarsHeroComponentQuery = gql`
fourPillarsHeroComponents {
    nodes {
      fourPillarsHeroComponentFields {
        communityResiliency {
          text
          title
          bgMobile {
            node {
              altText
              sourceUrl
            }
          }
          bg {
            node {
              altText
              sourceUrl
            }
          }
        }
        financialSecurity {
          text
          title
          bg {
            node {
              altText
              sourceUrl
            }
          }
          bgMobile {
            node {
              altText
              sourceUrl
            }
          }
        }
        healthyCommunity {
          text
          title
          bg {
            node {
              altText
              sourceUrl
            }
          }
          bgMobile {
            node {
              altText
              sourceUrl
            }
          }
        }
        youthOpportunity {
          text
          title
          bg{
            node {
              altText
              sourceUrl
            }
          }
          bgMobile {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }`;

// GraphQL query string for the Home page
export const homePageQuery = gql`
  query HomePage {
    homePageHeroes {
    nodes {
      homePageHeroFields {
        bg {
          node {
            sourceUrl(size: LARGE)
          }
        }
        bgMobile {
          node {
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
        feature1 {
          link
          text
          linkText
          secondLink
          secondLinkText
          title
          image {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          optionalMedia {
            node {
              mediaItemUrl
            }
          }
          optionalMediaLabel

        }
        feature2 {
          link
          linkText
          secondLink
          secondLinkText
          text
          title
          image {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          optionalMedia {
            node {
              mediaItemUrl
            }
          }
          optionalMediaLabel

         
        }
        feature3 {
          link
          linkText
          secondLink
          secondLinkText
          text
          title
          image {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          optionalMedia {
            node {
              mediaItemUrl
            }
          }
          optionalMediaLabel
        }
        heading
        subheading
      }
    }
  }
    ${partnersTickerComponentQuery}
    ${ourImpactCarouselComponentQuery}
    ${howToContributeComponentQuery}
    ${impactStatisticsComponentQuery}
  }
`;

export const agenciesPageQuery = gql`
  query AgenciesPage {
    ${partnersTickerComponentQuery}
  }
`;

//  GraphQL query string for the Our Impact page
export const ourImpactPageQuery = gql`
  query OurImpactPage {
    heroComponentOurImpactPages {
      nodes {
        heroComponentFields {
          text
          title
          bgMobile {
            node {
              altText
              sourceUrl(size: LARGE)
            }
          }

          bg {
            node {
              altText
              sourceUrl(size: LARGE)
            }
          }
        }
      }
    }
    fourPillarsPreviews {
      nodes {
        fourPillarsPreviewFields {
          pillars {
            communityResiliencyText
            communityResiliencyTitle
            communityResiliencyBg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            communityResiliencyImg {
              node {
                altText
                sourceUrl(size: LARGE)
              }
            }
            communityResiliencyLink
            financialSecurityBg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            financialSecurityImg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            financialSecurityLink
            financialSecurityText
            financialSecurityTitle
            healthyCommunityBg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            healthyCommunityImg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            healthyCommunityLink
            healthyCommunityText
            healthyCommunityTitle
            youthOpportunityBg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            youthOpportunityImg {
              node {
                sourceUrl(size: LARGE)
              }
            }
            youthOpportunityLink
            youthOpportunityText
            youthOpportunityTitle
          }
        }
      }
    }
    ${ourImpactCarouselComponentQuery}
    ${howToContributeComponentQuery}
    ${impactStatisticsComponentQuery}
    ${faqsComponentQuery}
  }
`;

// GraphQL query string for the Healthy Community page
export const healthyCommunityPageQuery = gql`
  query HealthyCommunityPage {
    ${fourPillarsHeroComponentQuery}
    mobileFoodPantryComponents {
      nodes {
        mobileFoodPantryComponentFields {
          buttonText
          link
          text
          title
          image {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          bgMobile {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
        }
      }
    }
    ${howToContributeComponentQuery}
  }
`;

// GraphQL query string for the Community Resiliency page
export const communityResiliencyPageQuery = gql`
  query communityResiliencyPage {
    ${fourPillarsHeroComponentQuery}
    
    ${ourImpactCarouselComponentQuery}
    ${aliceReportContentQuery}
    ${howToContributeComponentQuery}
  }
`;

// GraphQL query string for the Youth Opportunity page
export const youthOpportunityPageQuery = gql`
  query youthOpportunityPage {
${fourPillarsHeroComponentQuery}
    ymcaComponents {
      nodes {
        yMCAComponentFields {
          brandImg {
            node {
              sourceUrl(size: LARGE)
              altText
            }
          }
          image {
            node {
              altText
              sourceUrl(size: LARGE)
            }
          }
          link1
          link2
          linkText1
          text
          linkText2
          title
        }
      }
    }
    ${girlScoutsComponentQuery}
    ${northwoodsAirLifelineComponentQuery}
    ${ourImpactCarouselComponentQuery}
    ${howToContributeComponentQuery}
  }
`;

// GraphQL query string for the Financial Security page
export const financialSecurityPageQuery = gql`
  query financialSecurityPage {
    ${vitaTaxPrepComponentQuery}
${fourPillarsHeroComponentQuery}
    ${aliceReportContentQuery}
    ${howToContributeComponentQuery} 
  }
`;

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

export const ourCulturePageQuery = gql`
  query OurCulturePage {
    mediaItem1: mediaItems(where: { title: "${OUR_CULTURE_PAGE_IMG_ONE_TITLE}" }) {
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

export const individualsPageQuery = gql`
  query IndividualsPage {
    ${individualsPageHeroComponentQuery}
    ${ourImpactCarouselComponentQuery}
    ${faqsComponentQuery}
  }
`;

export const getInvolvedPageQuery = gql`
  query GetInvolvedPage {
    getInvolvedHeroes {
      nodes {
        getInvolvedHeroFields {
          text
          title
          bgMobile {
            node {
              sourceUrl(size: LARGE)
            }
          }
          bg {
            node {
              sourceUrl(size: LARGE)
            }
          }
        }
      }
    }
    ${partnersTickerComponentQuery}
    ${ourImpactCarouselComponentQuery}
    ${howToContributeComponentQuery} 
    ${impactStatisticsComponentQuery}
  }
`;

export const partnerPageQuery = gql`
 query PartnerPage {
 partnerPageHeroes {
    nodes {
      partnerPageHeroFields {
        text
        title
        bg {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
        bgMobile {
          node {
            altText
            sourceUrl(size: LARGE)
          }
        }
      }
    }
  }
  ${partnersTickerComponentQuery}
  ${ourImpactCarouselComponentQuery}
  ${howToContributeComponentQuery}
 }
 `;



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
  }
`