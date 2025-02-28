import { gql } from "@apollo/client";

export const GET_ALL_PAGES_SLUGS = gql`
  query GetAllPagesSlugs {
    pages {
      nodes {
        slug
      }
    }
  }
`;
