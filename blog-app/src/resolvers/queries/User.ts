import { Context } from '../..';
import { User } from '.prisma/client';
import { GetPayload, PayloadType } from '../mutations/helpers/getPayload';
import {
  errorForbiddeAccess,
  errorSmthWentWrong,
} from '../mutations/helpers/errors';

type UserMe = (_:any, args: any, context: Context) => (
  Promise<PayloadType<User>>
)

const getPayload: GetPayload<User> = (opt) => {
  const { userErrors = [], data = null, token = null } = opt;
  return { userErrors, data, token }
}

export const me: UserMe = async (parent, args, context) => {
  try {
    const { prisma, userInfo } = context;

    if (!userInfo) {
      return getPayload({ userErrors: errorForbiddeAccess() })
    }

    const user = await prisma.user.findUnique({
      where: { id: userInfo.userId }
    });

    return getPayload({ data: user });
  } catch (error) {
    console.error('FUNCK');
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
