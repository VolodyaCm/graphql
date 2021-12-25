import validator from 'validator';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Context } from '../../index';
import { User, Post } from '.prisma/client';
import { GetPayload, PayloadType } from './helpers/getPayload';
import {
  errorSmthWentWrong,
  errorNotExist,
  errorInvalidEmailFormat,
  errorInvalidPasswordFormat,
  errorInvalidNameFormat,
  errorInvalidBio,
  errorInvalidEmailPassword
} from './helpers/errors';

const getPayload: GetPayload<User> = (opt) => {
  const { userErrors = [], data = null, token = null } = opt;
  return { userErrors, data, token }
}

type UserCreateParams = (_:any, args: UserCreateArgsParam, context: Context) => (
  Promise<PayloadType<User>>
)

type UserSigninType = (_:any, args: { email: string, password: string }, context: Context) => (
  Promise<PayloadType<User>>
)

interface UserCreateArgsParam {
  email: string,
  name: string,
  password: string,
  bio: string
}

const getToken = (userId: string ) => (
  JWT.sign(
    { userId: userId },
    process.env.JWT_SIGNATURE || '',
    { expiresIn: '1d' }
  )
)

// User Create
export const userCreate: UserCreateParams = async (parent, args, { prisma }) => {
  try {
    const { email, name, password, bio } = args;

    if (!validator.isEmail(email)) {
      return getPayload({ userErrors: errorInvalidEmailFormat() });
    }

    if (!validator.isLength(password, { min: 8 })) {
      return getPayload({ userErrors: errorInvalidPasswordFormat() });
    }

    if (!validator.isLength(name, { min: 3 })) {
      return getPayload({ userErrors: errorInvalidNameFormat() })
    }

    if (!bio) return getPayload({ userErrors: errorInvalidBio() })

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword }
    });

    await prisma.profile.create({
      data: { bio, userId: user.id }
    })

    const token = getToken(user.id)

    return getPayload({ data: user, token });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}

export const signin: UserSigninType = async (parent, args, { prisma }) => {
  try {
    const { email, password } = args;
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return getPayload({ userErrors: errorInvalidEmailPassword() })
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return getPayload({ userErrors: errorInvalidEmailPassword() })
    }

    const token = getToken(user.id);

    return getPayload({ data: user, token })
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
