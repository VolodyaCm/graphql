const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { Query } = require('./resolvers/Query');
const { Product } = require('./resolvers/Product');
const { Category } = require('./resolvers/Category');
const { Mutation } = require('./resolvers/Mutation');
const data = require('./data');

const resolvers = {
  Query,
  Product,
  Category,
  Mutation
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { data }
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`)
});
