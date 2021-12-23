import { Context } from '..';

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
  }
}
