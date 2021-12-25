import { Context } from '..';
import { User } from '.prisma/client';
import { GetPayload, PayloadType } from './mutations/helpers/getPayload';
import {
  errorSmthWentWrong,
} from './mutations/helpers/errors';

interface ProfileParentType {
  id: string;
  bio: number;
  userId: string;
}

type UserProfile = (
  parent: ProfileParentType,
  args: any,
  context: Context) => (
  Promise<PayloadType<User>>
)

const getPayload: GetPayload<User> = (opt) => {
  const { userErrors = [], data = null, token = null } = opt;
  return { userErrors, data, token }
}

export const user: UserProfile = async (parent, args, context) => {
  try {
    const { prisma } = context;
    const { userId } = parent;

    console.log('FROM PRIFILE USRR')
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    return getPayload({ data: user });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
