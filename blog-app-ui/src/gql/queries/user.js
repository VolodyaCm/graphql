import { gql } from '@apollo/client';

export const USER_CREATE = gql`
  mutation userCreate($email: String!, $password: String!, $bio: String!, $name: String!) {
    userCreate(email: $email, password: $password, bio: $bio, name: $name ) {
      data {
        id
      }
    }
  }
`
