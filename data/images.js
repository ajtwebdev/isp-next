import { gql } from "@apollo/client";
export const QUERY_ALL_GALLERY_IMAGES = gql`
  query GET_PAGES {
    pages(where: { id: 41 }) {
      edges {
        node {
          id
          title
          date
          uri
          ACF_GalleryPage {
            gallery {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_ALL_PROJECTS_IMAGES = gql`
  query GET_PAGES {
    pages(where: { id: 2490 }) {
      edges {
        node {
          id
          title
          date
          uri
          ACF_GalleryPage {
            gallery {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
export const QUERY_ALL_BOOOKS_IMAGES = gql`
  query GET_PAGES {
    pages(where: { id: 2475 }) {
      edges {
        node {
          id
          title
          date
          uri
          ACF_GalleryPage {
            gallery {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
export const QUERY_ALL_WALLART_IMAGES = gql`
  query GET_PAGES {
    pages(where: { id: 2485 }) {
      edges {
        node {
          id
          title
          date
          uri
          ACF_GalleryPage {
            gallery {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
