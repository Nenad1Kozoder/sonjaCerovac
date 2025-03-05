import { gql } from "@apollo/client";

export const GET_GALLERY = gql`
  query GetGallery($slug: String!) {
    galleryBy(slug: $slug) {
      title
      content
      featuredImage {
        node {
          sourceUrl(size: LARGE)
        }
      }
    }
  }
`;

export const GET_GALLERIES = gql`
  query GetGalleries {
    galleries {
      nodes {
        slug
      }
    }
  }
`;
