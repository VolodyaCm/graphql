import 'module-alias/register';
import { ApolloServer } from 'apollo-server';
import typeDefs from '@gql/schema';
import resolvers from '@resolvers/';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready on ${url}`);
})
