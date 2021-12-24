import validator from 'validator';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Context } from '../../index';
import { User } from '.prisma/client';
import { getPayload, PayloadType } from './helpers/getPayload';
import {
  errorSmthWentWrong,
  errorNotExist,
  errorInvalidEmailFormat,
  errorInvalidPasswordFormat,
  errorInvalidNameFormat,
  errorInvalidBio,
} from './helpers/errors';

type UserCreateParams = (_:any, args: UserCreateArgsParam, context: Context) => (
  Promise<PayloadType<User>>
)

interface UserCreateArgsParam {
  email: string,
  name: string,
  password: string,
  bio: string
}

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

    const token = JWT.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SIGNATURE || '',
      { expiresIn: '1d' }
    );

    return getPayload({ data: user, token });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
