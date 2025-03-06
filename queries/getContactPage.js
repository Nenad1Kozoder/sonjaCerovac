import { gql } from "@apollo/client";

export const GET_CONTACT = gql`
  query GetContactPage {
    page(id: "contact-me", idType: URI) {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      contactInformation {
        title
        description
        qrDescription
        hospitalLogo {
          node {
            sourceUrl
          }
        }
        qrCode {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;
