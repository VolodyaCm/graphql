const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    hello: String
    products: [Product!]!
    product(id: String!): Product
    categories: [Category!]!
    category(id: String!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Float!
    onSale: Boolean!
    image: String!,
    categoryId: String!,
    categories: [Category!]!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;
