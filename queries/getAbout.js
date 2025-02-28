import { gql } from "@apollo/client";

export const GET_ABOUT = gql`
  query GetAboutPage {
    page(id: "about", idType: URI) {
      content(format: RENDERED)
      groupSections {
        firstSection {
          firstTitle
          firstDescription
          firstImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
        }
        secondSection {
          secondTitle
          secondDescription
          secondImage {
            node {
              sourceUrl
            }
          }
        }
        thirdSection {
          thirdTitle
          thirdDescription
          thirdImage {
            node {
              sourceUrl
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
    }
  }
`;
