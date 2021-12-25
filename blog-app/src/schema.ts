import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: String!, post: PostInput!): PostPayload!
    postDelete(postId: String!): PostPayload!
    userCreate(email: String!, name: String, password: String!, bio: String!): UserPayload!
    signin(email: String!, password: String!): UserPayload
  }

  type UserError {
    message: String
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  type UserPayload {
    userErrors: [UserError!]!
    data: User
    token: String
  }

  # Post Schema
  type Post {
    id: String!
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
    id: String!
    name: String!
    email: String!
    createdAt: String!
    profile: Profile!
    posts: [Post!]!
  }

  # Profile Schema
  type Profile {
    id: String!
    bio: String!
    user: User!
  }
`
