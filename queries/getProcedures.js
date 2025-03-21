import { gql } from "@apollo/client";

export const GET_PROCEDURES = gql`
  query GetProceduresPage {
    page(id: "procedures", idType: URI) {
      topSection {
        topTitle
        topDescription
      }
      featuredImage {
        node {
          sourceUrl(size: LARGE)
        }
      }
      groupSections {
        firstSection {
          firstTitle
          firstDescription
          firstImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          firstTreatment {
            nodes {
              ... on Page {
                uri
              }
            }
          }
        }
        secondSection {
          secondTitle
          secondDescription
          secondImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          secondTreatment {
            nodes {
              ... on Page {
                uri
              }
            }
          }
        }
        thirdSection {
          thirdTitle
          thirdDescription
          thirdImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          thirdTreatment {
            nodes {
              ... on Page {
                uri
              }
            }
          }
        }
      }
      content(format: RENDERED)
      contactMe {
        linkLabel
        pageLink {
          nodes {
            uri
          }
        }
      }
      seo {
        seoDescription
        seoKeyWords
        seoTitle
      }
    }
  }
`;
