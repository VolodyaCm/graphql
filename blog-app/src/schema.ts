import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postDelete(postId: ID!): PostPayload!
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
