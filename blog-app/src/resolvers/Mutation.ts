import { Context } from '../index';
import { Post } from '.prisma/client';

interface PostCreateArgs {
  title: string,
  content: string,
}

type UserErrors = { message: String }[];

interface PostPayloadType {
  userErrors: UserErrors,
  post: Post | null
}

interface GetPayloadArgs {
  userErrors?: UserErrors,
  post?: Post | null
}

const getPayload = (opt: GetPayloadArgs): PostPayloadType => {
  const { userErrors = [], post = null } = opt;
  return { userErrors, post }
}

const postBodyError = (): UserErrors => (
  [{ message: 'You must provide title and contnet to create a post' }]
)

export const Mutation = {
  postCreate: async (_:any, args: PostCreateArgs, { prisma }: Context): Promise<PostPayloadType> => {
    try {
      const { title, content } = args;

      if (!title || !content) {
        return getPayload({ userErrors: postBodyError() });
      }

      const post = await prisma.post.create({
        data: { title, content, authorId: 1 }
      });

      return { userErrors: [], post }
    } catch (error) {
      console.error(error);
      return { post: null, userErrors: [{ message: 'Something went wrong' }] }
    }
  },
}
