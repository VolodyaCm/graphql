import { User } from "@prisma/client";

export type UserErrors = { message: String }[] | [];

export const errorTitleContent = (): UserErrors => (
  [{ message: 'You must provide title and contnet to create a post' }]
)

export const errorSmthWentWrong = (): UserErrors => (
  [{ message: 'Something went wrong' }]
)

export const errorNotExist = (): UserErrors => (
  [{ message: 'Post does not exist' }]
)

export const errorInvalidEmailFormat = (): UserErrors => (
  [{ message: 'Invalid email format' }]
)

export const errorInvalidPasswordFormat = (): UserErrors => (
  [{ message: 'Invalid password length. Password should be at least eight characters in length' }]
)

export const errorInvalidNameFormat = (): UserErrors => (
  [{ message: 'Invalid name. Name should be at least 3 characters in length' }]
)

export const errorInvalidBio = (): UserErrors => (
  [{ message: 'Invalid bio' }]
)

export const errorInvalidEmailPassword = (): UserErrors => (
  [{ message: 'Invalid user email or password' }]
)
