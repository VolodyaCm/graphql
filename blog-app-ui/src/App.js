import './App.css';
import PostsPage from './pages/posts';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <div className="App">
      <Container>
        <Grid container direction='row' flex justifyContent="right">
          <Grid item sx={{ margin: '0 8px'}}><LoginForm /></Grid>
          <Grid item sx={{ margin: '0 8px'}}><RegisterForm /></Grid>
        </Grid>
      </Container>
      <PostsPage />
    </div>
  );
}

export default App;
