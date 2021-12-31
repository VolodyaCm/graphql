const fetch = require('node-fetch');
const posts = require('../data/posts');
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const body = {
  query: `{
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
  }`
}

const mutation = `
  mutation($post: PostInput!) {
    postCreate(post: $post) {
      data {
        id
      }
    }
  }
`

const importPosts = async (data = []) => {
  try {
    data.forEach((r) => {
      fetch('http://localhost:4000/graphql', {
        method: 'post',
        body: JSON.stringify({
          query: mutation,
          variables: {
            post: { title: r.title, content: r.content }
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiODVkNzY5ZS03ZWY3LTQyZTgtODE0YS0xNDI5ZDYxYmEzODUiLCJpYXQiOjE2NDA3NjAwMTgsImV4cCI6MTY0MDg0NjQxOH0.yF56qbcITP3Qhme1-HUArEhfPTkxe4NYW310ll7ZrLQ'
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

importPosts(posts);
