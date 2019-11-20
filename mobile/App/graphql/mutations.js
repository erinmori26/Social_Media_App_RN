import { gql } from "apollo-boost";

export const createStatus = gql`
  mutation CreateStatus(
    $statusText: String!
    $parentStatusId: String
    $imageLink: String
  ) {
    createStatus(
      status: {
        text: $statusText
        parentStatusId: $parentStatusId
        image: $imageLink
      }
    ) {
      _id
    }
  }
`;

export const likeStatus = gql`
  mutation LikeStatus($statusId: String!) {
    likeStatus(statusId: $statusId) {
      _id
      isLiked
    }
  }
`;
