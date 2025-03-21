import { gql } from "@apollo/client";

export const GET_PAGE_BY_SLUG = gql`
  query GetPage($slug: String!) {
    pageBy(uri: $slug) {
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl(size: LARGE)
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
