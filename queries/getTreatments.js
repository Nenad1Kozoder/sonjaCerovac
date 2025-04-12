import { gql } from "@apollo/client";

export const GET_TREATMENTS_BY_CATEGORY = gql`
  query GetTreatmentsByCategory($category: String!) {
    treatments(first: 100, where: { categoryName: $category }) {
      nodes {
        title
        slug
        content
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            slug
            name
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
