const { gql } = require("apollo-server");

// define different types in the app
// schema
const typeDefs = gql`
  type Example {
    _id: String
    text: String
  }

  type User {
    _id: String
    avatarUri: String
    name: String
    username: String
  }

  type Status {
    _id: String
    userId: String
    status: String
    publishedAt: String
    parentStatusId: String
    user: User
    isLiked: Boolean
    image: String
  }

  type Query {
    example: Example
    feed: [Status]
    responses(_id: String): [Status]
  }

  input StatusInput {
    text: String!
    parentStatusId: String
    image: String
  }

  type Mutation {
    createStatus(status: StatusInput, image: String): Status
    likeStatus(statusId: String!): Status
  }
`;

module.exports = typeDefs;
