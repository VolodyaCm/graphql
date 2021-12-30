import './App.css';
import PostsPage from './pages/posts';
import RegisterForm from './components/RegisterForm';
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
      <Container>
        <RegisterForm />
      </Container>
      <PostsPage />
    </div>
  );
}

export default App;
