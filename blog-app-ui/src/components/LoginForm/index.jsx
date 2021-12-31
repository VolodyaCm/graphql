
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNIN } from '../../gql/queries/user';

const LoginFormComponent = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [signin, { loading }] = useMutation(SIGNIN);

  const submit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      setError(true)
    } else {
      setError(false)
    }

    try {
      const res = await signin({
        variables: { email, password }
      });
      localStorage.setItem('token', res.data.signin.token);
    } catch (error) {
      console.error(error);
    }
  }

  const exec = (f) => (e) => {
    e.preventDefault();
    f(e.target.value);
  }

  return (
    <div>
      <h1 style={{ textAlign: 'left', marginTop: 0 }}>Login</h1>
      <Card sx={{ padding: '16px', bgcolor: '#f9f9f9' }}>
        <form onSubmit={submit}>
          <Grid container direction='column'>
            <Input
              onChange={exec(setEmail)}
              type='text'
              value={email}
              placeholder='Email'
            />

            <Input
              error={error}
              type='password'
              value={password}
              placeholder='Password'
              onChange={exec(setPassword)}
            />

            {error && <InputLabel children='Invalid login or password' error={error} />}

            <Grid>
              {loading && <CircularProgress size={16} />}
              <Button type='submit'>Login</Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  )
}

export default LoginFormComponent;
