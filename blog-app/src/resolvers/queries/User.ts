import { Context } from '../..';
import { User, Profile } from '.prisma/client';
import { GetPayload, PayloadType } from '../mutations/helpers/getPayload';
import {
  errorForbiddeAccess,
  errorSmthWentWrong,
} from '../mutations/helpers/errors';

type Related = User | Profile;

type UserMe = (_:any, args: any, context: Context) => (
  Promise<PayloadType<Related>>
)

type UserProfile = (_:any, args: { userId: string }, context: Context) => (
  Promise<PayloadType<Related>>
)

export const getPayload: GetPayload<Related> = (opt) => {
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
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}

export const profile: UserProfile = async (parent, args, context) => {
  try {
    const { prisma } = context;
    const { userId } = args;

    const profile = await prisma.profile.findUnique({
      where: { userId }
    });

    return getPayload({ data: profile });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
