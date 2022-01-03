import { UserQueries } from '@queries/';

const resolvers = {
  Query: {
    ...UserQueries
  },

  Mutation: {
  }
}

export default resolvers;
