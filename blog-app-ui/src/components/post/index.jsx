import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const PostComponent = ({ post }) => {
  return (
    <Card sx={{ maxWidth: 275, bgcolor: '#f9f9f9', marginBottom: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, textAlign: 'left' }} color="text.secondary" gutterBottom>
          {post.authorName || '@anonimus'}
        </Typography>
        <Typography sx={{ textAlign: 'left' }} variant="h5" component="div">
          { post.title}
        </Typography>
        <Typography sx={{ textAlign: 'left' }} variant="body2">
          {post.content.slice(0, 200 ) + '...'}
        </Typography>
        <CardActions>
          <Button size="small">Read More</Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PostComponent;
