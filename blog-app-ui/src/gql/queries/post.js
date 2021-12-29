import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query {
    posts {
      title
      content
      createdAt
      user {
        data {
          name
        }
      }
    }
  }
`
