import { gql } from "@apollo/client";

export const GET_TREATMENTS = gql`
  query GetTreatments {
    treatments {
      nodes {
        title
        content
        categories {
          edges {
            node {
              name
              slug
            }
          }
        }
        tags {
          edges {
            node {
              slug
              name
            }
          }
        }
      }
    }
  }
`;
