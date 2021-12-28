import { Context } from '..';
import { User } from '.prisma/client';
import { GetPayload, PayloadType } from './mutations/helpers/getPayload';
import {
  errorForbiddeAccess,
  errorSmthWentWrong,
} from './mutations/helpers/errors';

type PostUser = (parent: { authorId: string }, args: any, context: Context) => (
  Promise<PayloadType<User>>
)

const getPayload: GetPayload<User> = (opt) => {
  const { userErrors = [], data = null, token = null } = opt;
  return { userErrors, data, token }
}

export const user: PostUser = async (parent, args, context) => {
  try {
    const { authorId } = parent;
    const { prisma } = context;

    console.log('userId', authorId);
    const user = await prisma.user.findUnique({
      where: { id: authorId }
    });

    return getPayload({ data: user });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
