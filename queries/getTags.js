import { gql } from "@apollo/client";

export const GET_TAGS = gql`
  query GetTags {
    tags(first: 100) {
      nodes {
        name
      }
    }
  }
`;
