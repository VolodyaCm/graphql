import { Context } from "../../..";
import { GetPayload } from './getPayload';
import { errorForbiddeAccess } from './errors';
import { Post } from '.prisma/client';

interface CanUserMutatePost {
  userId: string,
  postId: string,
  prisma: Context['prisma'],
}

export const getPayload: GetPayload<Post> = (opt) => {
  const { userErrors = [], data = null, token = null } = opt;
  return { userErrors, data, token }
}

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma
}: CanUserMutatePost) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return getPayload({ userErrors: [{ message: 'User not found' }] })
  }

  const post = await prisma.post.findUnique({
    where: { id: postId }
  });

  if (post?.authorId !== user.id) {
    return getPayload({ userErrors: errorForbiddeAccess() })
  }
}
