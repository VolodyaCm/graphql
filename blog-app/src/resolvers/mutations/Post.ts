import { Context } from '../../index';
import { Post } from '.prisma/client';
import { errorForbiddeAccess } from './helpers/errors';
import { canUserMutatePost } from './helpers/canUserMutatePost';
import { GetPayload, PayloadType } from './helpers/getPayload';

type UserErrors = { message: String }[];

type PostCreateParams = (_:any, args: PostCreateArgsParam, context: Context) => (
  Promise<PayloadType<Post>>
)

type PostUpdateParams = (_:any, args: { postId: string, post: PostCreateArgsParam['post'] }, context: Context) => (
  Promise<PayloadType<Post>>
)

type PostDeleteParams = (_:any, args: { postId: string }, context: Context) => (
  Promise<PayloadType<Post>>
)

type PostPublishParams = (_:any, args: { postId: string }, context: Context) => (
  Promise<PayloadType<Post>>
)

interface PostCreateArgsParam {
  post: {
    title: string,
    content: string,
  }
}

const getPayload: GetPayload<Post> = (opt) => {
  const { userErrors = [], data = null, token = null } = opt;
  return { userErrors, data, token }
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
export const postCreate: PostCreateParams = async (parent, args, context) => {
  try {
    const { prisma, userInfo} = context;
    const { title, content } = args.post;

    if (!userInfo?.userId) {
      return getPayload({ userErrors: errorForbiddeAccess() })
    }

    const user = await prisma.user.findUnique({
      where: { id: userInfo?.userId }
    })

    if (!user) {
      return getPayload({ userErrors: errorForbiddeAccess() })
    }

    if (!title || !content) {
      return getPayload({ userErrors: errorTitleContent() });
    }

    const post = await prisma.post.create({
      data: { title, content, authorId: userInfo.userId }
    });

    return getPayload({ data: post });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
};

// Post Update
export const postUpdate: PostUpdateParams = async (parent, args, context) => {
  try {
    const { prisma, userInfo } = context;
    const { title, content } = args.post;
    const { postId } = args;

    if (!userInfo) {
      return getPayload({ userErrors: errorForbiddeAccess() })
    }

    const canMutate = await canUserMutatePost({
      userId: userInfo.userId,
      postId: postId,
      prisma,
    });

    if (canMutate) return canMutate;

    if (!title && !content) {
      return getPayload({ userErrors: errorTitleContent() });
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: postId }
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
      where: { id: postId },
    })

    return getPayload({ data: post });
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}

// Post Delete
export const postDelete: PostDeleteParams = async (parent, { postId }, context) => {
  try {
    const { prisma, userInfo } = context;

    if (!userInfo) {
      return getPayload({ userErrors: errorForbiddeAccess() })
    }

    const canMutate = await canUserMutatePost({
      userId: userInfo.userId,
      postId: postId,
      prisma,
    });

    if (canMutate) return canMutate;

    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return getPayload({ userErrors: errorNotExist() })
    }

    await prisma.post.delete({
      where: { id: postId }
    })

    return getPayload({ data: post })
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}

export const postPublish: PostPublishParams = async (parent, args, context) => {
  try {
    const { prisma, userInfo } = context;
    const { postId } = args;

    if (!userInfo) {
      return getPayload({ userErrors: errorForbiddeAccess() })
    }

    const canMutate = await canUserMutatePost({
      userId: userInfo.userId,
      postId: postId,
      prisma,
    });

    if (canMutate) return canMutate;

    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    })

    return getPayload({ data: post })
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}

export const postUnpublish: PostPublishParams = async (parent, args, context) => {
  try {
    const { prisma, userInfo } = context;
    const { postId } = args;

    if (!userInfo) {
      return getPayload({ userErrors: errorForbiddeAccess() })
    }

    const canMutate = await canUserMutatePost({
      userId: userInfo.userId,
      postId: postId,
      prisma,
    });

    if (canMutate) return canMutate;

    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: false },
    });
    throw new Error('Fuck');

    return getPayload({ data: post })
  } catch (error) {
    console.error(error);
    return getPayload({ userErrors: errorSmthWentWrong() })
  }
}
