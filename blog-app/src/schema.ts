import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
    me: UserPayload
    profile(userId: String!): ProfilePayload
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: String!, post: PostInput!): PostPayload!
    postDelete(postId: String!): PostPayload!
    postPublish(postId: String!): PostPayload!
    postUnpublish(postId: String!): PostPayload!
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

  type PostsPayload {
    userErrors: [UserError!]!
    data: [Post!]!
  }

  type UserPayload {
    userErrors: [UserError!]!
    data: User
    token: String
  }

  type ProfilePayload {
    userErrors: [UserError!]!
    data: Profile
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
    posts: PostsPayload
  }

  # Profile Schema
  type Profile {
    id: String!
    bio: String!
    user: UserPayload!
  }
`
