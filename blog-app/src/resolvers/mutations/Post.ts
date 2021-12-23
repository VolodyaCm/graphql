import { Context } from '../../index';
import { Post } from '.prisma/client';

type UserErrors = { message: String }[];

type PostCreateParams = (_:any, args: PostCreateArgsParam, context: Context) => (
  Promise<PostPayloadType>
)

type PostUpdateParams = (_:any, args: { postId: String, post: PostCreateArgsParam['post'] }, context: Context) => (
  Promise<PostPayloadType>
)

type PostDeleteParams = (_:any, args: { postId: String }, context: Context) => (
  Promise<PostPayloadType>
)

interface PostPayloadType {
  userErrors: UserErrors,
  post: Post | null
}

interface GetPayloadArgs {
  userErrors?: UserErrors,
  post?: Post | null
}

interface PostCreateArgsParam {
  post: {
    title: string,
    content: string,
  }
}

const getPayload = (opt: GetPayloadArgs): PostPayloadType => {
  const { userErrors = [], post = null } = opt;
  return { userErrors, post }
}

const errorTitleContent = (): UserErrors => (
  [{ message: 'You must provide title and contnet to create a post' }]
)

const errorSmthWentWrong = (): UserErrors => (
  [{ message: 'Something went wrong' }]
)

const errorNotExist = (): UserErrors => (
  [{ message: 'Post does not exist' }]
)

// Post Create
export const postCreate: PostCreateParams = async (parent, args, { prisma }) => {
  try {
    const { title, content } = args.post;

    if (!title || !content) {
      return getPayload({ userErrors: errorTitleContent() });
    }

    const post = await prisma.post.create({
      data: { title, content, authorId: 1 }
    });

    return getPayload({ post });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
};

// Post Update
export const postUpdate: PostUpdateParams = async (parent, args, { prisma }) => {
  try {
    const { title, content } = args.post;
    const { postId } = args;

    if (!title && !content) {
      return getPayload({ userErrors: errorTitleContent() });
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: Number(postId) }
    });

    if (!existingPost) {
      return getPayload({ userErrors: errorNotExist() })
    }

    interface Payload {
      title?: string,
      content?: string
    }

    const payloadToUpdate: Payload = { title, content };

    if (!title) delete payloadToUpdate?.title;
    if (!content) delete payloadToUpdate?.content;

    const post = await prisma.post.update({
      data: { ...payloadToUpdate },
      where: { id: Number(postId) },
    })

    return getPayload({ post });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}

// Post Delete
export const postDelete: PostDeleteParams = async (parent, { postId }, { prisma }) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) }
    })

    if (!post) {
      return getPayload({ userErrors: errorNotExist() })
    }

    await prisma.post.delete({
      where: { id: Number(postId) }
    })

    return getPayload({ post })
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
