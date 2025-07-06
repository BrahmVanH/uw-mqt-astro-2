import { gql } from "graphql-request";

export const seniorCenterComponentQuery = gql`
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


export const impactStatisticsComponentQuery = gql`
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
export const vitaTaxPrepComponentQuery = gql`
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
export const northwoodsAirLifelineComponentQuery = gql`
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
export const howToContributeComponentQuery = gql`
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
export const aliceReportContentQuery = gql`
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


// GraphQL query string for the Partners Ticker component

export const partnersTickerComponentQuery = gql`
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
export const faqsComponentQuery = gql`
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

