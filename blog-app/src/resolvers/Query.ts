import { Context } from '..';
import { me } from './queries/User';

export const Query = {
  posts: async (_:any, __:any, { prisma }: Context) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: [{ createdAt: 'desc' }]
      })
      return posts;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  me,
}
