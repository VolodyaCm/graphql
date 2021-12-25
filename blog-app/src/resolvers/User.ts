import { Context } from '..';
import { User, Post } from '.prisma/client';
import { GetPayload, PayloadType } from './mutations/helpers/getPayload';
import {
  errorSmthWentWrong,
} from './mutations/helpers/errors';

interface PostsParentType {
  id: string;
}

type UserPosts = (
  parent: PostsParentType,
  args: any,
  context: Context) => (
  Promise<PayloadType<Post[]>>
)

const getPayload: GetPayload<Post[]> = (opt) => {
  const { userErrors = [], data = null, token = null } = opt;
  return { userErrors, data, token }
}

export const posts: UserPosts = async (parent, args, context) => {
  try {
    const { prisma, userInfo } = context;
    const isOwnAcc = parent.id === userInfo?.userId;

    console.log('userInfo', userInfo);

    if (isOwnAcc) {
      const data = await prisma.post.findMany({
        where: {
          authorId: parent.id
        },
        orderBy: [{ createdAt: 'desc' }]
      });

      console.log('FORM P USER POSTS', isOwnAcc);

      return getPayload({ data });
    }

    const data = await prisma.post.findMany({
      where: { authorId: parent.id, published: true },
      orderBy: [{ createdAt: 'desc' }],
    })

    return getPayload({ data });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
