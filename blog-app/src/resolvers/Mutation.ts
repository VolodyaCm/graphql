import {
  postCreate,
  postUpdate,
  postDelete,
  postPublish,
  postUnpublish,
} from './mutations/Post';
import { userCreate, signin } from './mutations/User';

export const Mutation = {
  postCreate,
  postUpdate,
  postDelete,
  postPublish,
  postUnpublish,
  userCreate,
  signin,
}
