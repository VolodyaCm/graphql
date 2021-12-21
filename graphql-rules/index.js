const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupCreate(groupId: ID!)
    groupDelete(groupId: ID!)
    groupUpdate(groupId: ID!)
    groupAddCars(groupId: ID!, carID: ID!)
    groupRemoveCars(groupId: ID!, carID: ID!)
    groupCreate(
      groupInput: GroupInput!
    ): Group
    groupUpdate(
      groupId: ID!
      groupInput: GroupInput!
    ): GroupUpdatePayload
  }

  type GroupUpdatePayload {
    group: Group
    userErrors: [UserErrors!]!
  }

  type UserErrors {
    message: String!
    field: [String!]!
  }

  input GroupInput {
    name: String
    image: ImageInput
    descriptiona: String
    featureSet: GroupFeatureFieldss
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    image: Image!
    name: String!
    description: String
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    featureSet: GroupFeatureSet
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    applyFeaturesSeperately: Boolean!
    features: [GroupFeatures!]!
  }

  type GroupFeatures {
    feature: GroupFeatureFields!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

exports.typeDefs = typeDefs;
