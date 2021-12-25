import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './schema';
import { Query, Mutation, Profile, User } from './resolvers';
import { PrismaClient, Prisma } from '@prisma/client';
import { getUserFromToken } from './helpers/getUserFromToken';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
  userInfo: {
    userId: string
  } | null
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    User,
  },
  context: async ({ req }: any): Promise<Context> => {
    const userInfo = getUserFromToken(req.headers.authorization);

    console.log('CONTEXT', userInfo);
    return {
      prisma,
      userInfo,
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready on ${url}`);
})
