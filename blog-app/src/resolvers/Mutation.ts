import { postCreate, postUpdate, postDelete } from './mutations/Post';
import { userCreate, signin } from './mutations/User';

export const Mutation = {
  postCreate,
  postUpdate,
  postDelete,
  userCreate,
  signin,
}
