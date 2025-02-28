import { gql } from "@apollo/client";

export const GET_HOME_PAGE = gql`
  query GetHomePage {
    pages {
      nodes {
        id
        title
        isFrontPage
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
        content(format: RENDERED)
        homeTopSection {
          pretitle
          title
        }
        clinicalExpertiseSection {
          titleExpertise
          dropdownOne {
            title
            description
            button {
              label
              link {
                nodes {
                  uri
                  link
                }
              }
            }
          }
          dropdownTwo {
            description
            title
            button {
              label
              link {
                nodes {
                  link
                  uri
                }
              }
            }
          }
          dropdownThree {
            description
            title
            button {
              label
              link {
                nodes {
                  uri
                  link
                }
              }
            }
          }
        }
        historySection {
          backgroundImage {
            node {
              sourceUrl
            }
          }
          description
          titleHistory
        }
        contactHome {
          latitude
          longitude
          titleContact
          phone
          addresse
          buttonContact {
            buttonLabel
            buttonLink
          }
          hospitalLogo {
            node {
              sourceUrl
            }
          }
        }
        testimonials {
          testimonialsTitle
          testimonialsSubtitle
          testimonialsBackgroundImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          selectTestimonials {
            edges {
              node {
                ... on Testimonial {
                  content(format: RENDERED)
                  id
                }
              }
            }
          }
        }
        galerySection {
          gellerySectionTitle
          selectGalerys {
            edges {
              node {
                ... on Galery {
                  uri
                  title
                }
              }
            }
          }
          galleryBackgroundImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
        }
        references {
          references
        }
      }
    }
  }
`;
