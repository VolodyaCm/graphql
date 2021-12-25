
import { Post, User } from '.prisma/client';
import { UserErrors } from './errors';

export interface PayloadType<T> {
  userErrors?: UserErrors,
  data?: T | null,
  token?: string | null,
}

export type GetPayload<T> = (opt: PayloadType<T>) => PayloadType<T>

export const getPayload: GetPayload<User> = (opt) => {
  const { userErrors = [], data = null, token = null } = opt;
  return { userErrors, data, token }
}
