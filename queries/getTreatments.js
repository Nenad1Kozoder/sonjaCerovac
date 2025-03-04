import { gql } from "@apollo/client";

export const GET_TREATMENTS = gql`
  query GetTreatments {
    treatments(first: 100) {
      nodes {
        title
        content
        menuOrder
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
