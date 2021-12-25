import JWT from 'jsonwebtoken';

export const getUserFromToken = (token: string = '') => {
  try {
    const data = JWT.verify(token, process.env.JWT_SIGNATURE || '') as {
      userId: string
    }
    return data;
  } catch (error) {
    return null
  }
}
