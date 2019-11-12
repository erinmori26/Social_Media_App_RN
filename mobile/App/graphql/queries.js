import { gql } from "apollo-boost";

export const exampleQuery = gql`
  {
    example {
      text
    }
  }
`;

// call in gql
export const requestFeed = gql`
  {
    feed {
      _id
      status
      userId
      publishedAt
      isLiked
      user {
        _id
        username
        avatarUri
        name
      }
    }
  }
`;

// get responses with gql, pass in ID string to get correct responses
export const requestResponses = gql`
  query Responses($_id: String!) {
    responses(_id: $_id) {
      _id
      status
      userId
      publishedAt
      isLiked
      user {
        _id
        username
        avatarUri
        name
      }
    }
  }
`;
