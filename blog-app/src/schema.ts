import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload
  }

  type UserError {
    message: String
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  # Post Schema
  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }

  input PostInput {
    title: String
    content: String
  }

  # User Schema
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    profile: Profile!
    posts: [Post!]!
  }

  # Profile Schema
  type Profile {
    id: ID!
    bio: String!
    user: User!
  }
`
