const { ApolloServer, gql } = require('apollo-server');
const { products, categories } = require('./data');

const typeDefs = gql`
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

const resolvers = {
  Query: {
    hello: () => 'World!',
    products: () => products,
    product: (parent, { id }) => products.find(p => p.id === id),
    categories: () => categories,
    category: (parent, { id }) => categories.find(p => p.id === id),
  },
  Category: {
    products: (parent) => (
      products.filter(p => p.categoryId === parent.id)
    )
  },
  Product: {
    categories: (parent) => (
      categories.filter(c => c.id === parent.categoryId)
    )
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`)
});
