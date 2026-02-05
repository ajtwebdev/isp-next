import { gql } from "@apollo/client";

// Define here all ACF fields for `page_components` to match 1-to-1
export const PAGE_COMPONENTS_ACF_FIELDS = gql`
  fragment PageComponents on Page {
    pageComponents {
      pageComponents {
        ... on Page_Pagecomponents_PageComponents_Text {
          __typename
          text
        }
        ... on Page_Pagecomponents_PageComponents_Banner {
          __typename
          title
          description
          subheader
          image {
            altText
            sourceUrl(size: MEDIUM_LARGE)
            srcSet
          }
        }
        ... on Page_Pagecomponents_PageComponents_SeoPage {
          __typename
          title
          description
        }
        ... on Page_Pagecomponents_PageComponents_ImageRight {
          __typename
          body
          fieldGroupName
          subheader
          title
          button
          link
          image {
            altText
            sourceUrl(size: MEDIUM_LARGE)
            srcSet
          }
        }
          ... on Page_Pagecomponents_PageComponents_ImageRightContest {
          __typename
          body
          fieldGroupName
          subheader
          title
          button
          link
          image {
            altText
            sourceUrl(size: MEDIUM_LARGE)
            srcSet
          }
        }
        ... on Page_Pagecomponents_PageComponents_ImageGallery {
          __typename
          body
          subheader
          title
          imageGallery {
            altText
            sourceUrl(size: MEDIUM_LARGE)
            srcSet
          }
        }
        ... on Page_Pagecomponents_PageComponents_ComponentC {
          __typename
          body
          subheader
          title
          image {
            altText
            sourceUrl(size: MEDIUM_LARGE)
            srcSet
          }
        }
      }
    }
  }
`;

export const PAGE_FIELDS = gql`
  fragment PageFields on Page {
    children {
      edges {
        node {
          id
          slug
          uri
          ... on Page {
            id
            title
          }
        }
      }
    }
    id
    menuOrder
    parent {
      node {
        id
        slug
        uri
        ... on Page {
          title
        }
      }
    }
    slug
    title
    uri
  }
`;

export const QUERY_ALL_PAGES_INDEX = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES_ARCHIVE = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
          content
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PAGE_BY_URI = gql`
  ${PAGE_COMPONENTS_ACF_FIELDS}
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      children {
        edges {
          node {
            id
            slug
            uri
            ... on Page {
              id
              title
            }
          }
        }
      }
      content
      featuredImage {
        node {
          altText
          caption
          id
          sizes
          sourceUrl
          srcSet
        }
      }
      id
      menuOrder
      parent {
        node {
          id
          slug
          uri
          ... on Page {
            title
          }
        }
      }
      slug
      title
      uri
      ...PageComponents
    }
  }
`;

export const QUERY_PAGE_SEO_BY_URI = gql`
  query PageSEOByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;
