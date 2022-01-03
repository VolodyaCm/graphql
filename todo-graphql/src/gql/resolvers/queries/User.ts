import USERS from '@fakedata/users';

interface UsersArgs {
  filter?: { name?: string },
}

interface UserArgs {
  userId: string
}

export const users = (parent: any, args: UsersArgs ) => {
  let res = USERS;
  const { filter } = args;

  if (filter?.name) {
    const { name } = filter;
    res = USERS.filter((u) => (
      u.name.toLowerCase().includes(name.toLowerCase())
    ))
  }

  return res;
}

export const user = (parent: any, args: UserArgs) => {
  return USERS.find((u) => u.id === args.userId)
}
