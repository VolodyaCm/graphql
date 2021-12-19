const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    hello: String
    products(filter: ProductsFilterInput): [Product!]!
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
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

  input ProductsFilterInput {
    onSale: Boolean
    rating: Int
  }
`;
