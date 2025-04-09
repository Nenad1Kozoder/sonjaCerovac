import { gql } from "@apollo/client";

export const GET_TREATMENTS = gql`
  query GetTreatmentsByCategory($categoryName: String!) {
    treatments(first: 200, where: { categoryName: $categoryName }) {
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

export const GET_TREATMENT_CONTENT = gql`
  query GetTreatmentContent($title: String!) {
    treatments(where: { title: $title }) {
      nodes {
        content
      }
    }
  }
`;
