import { gql } from 'apollo-server';

const schema = gql`
  type Query {
    users(filter: usersParams): [User!]!
    user(userId: String!): User!
  }

  type Mutation {
    userCreate(input: userCreate): User!
  }

  input usersParams { name: String }
  input userCreate {
    firstName: String!
    lastName: String!
    name: String!
    email: String!
    gender: String!
  }

  type User {
    id: String!
    firstName: String!
    lastName: String!
    birthDate: String!
    name: String!
    email: String!
    gender: String!
  }
`

export default schema;
