import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(where: { parent: 0 }) {
      nodes {
        id
        slug
      }
    }
  }
`;

export const GET_CATEGORIES_BY_PARENT_ID = gql`
  query GetCategoriesByParentId($id: ID!) {
    category(id: $id) {
      name
      slug
      children {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`;
