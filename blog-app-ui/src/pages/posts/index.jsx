import React from 'react';
import PostItem from '../../components/post';
import { useQuery } from '@apollo/client';
import { POST } from '../../gql/queries';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const PostsPage = () => {
  const { data, error, loading } = useQuery(POST.GET_POSTS);

  return (
    <Container>
      <h1 style={{ textAlign: 'left' }}>Posts</h1>
      { error && <p>Error</p> }
      { loading && <p>Loading</p> }
      <Grid container spacing={2}>
        { data?.posts?.map((post) => (
          <Grid item>
            <PostItem post={post} />
          </Grid>
        )) }
      </Grid>
    </Container>
  )
}

export default PostsPage;
