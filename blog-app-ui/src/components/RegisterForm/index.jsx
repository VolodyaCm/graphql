import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_CREATE } from '../../gql/queries/user';

const RegisterFormComponent = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [error, setError] = useState(false);
  const [publishPost, { loading }] = useMutation(USER_CREATE);

  const submit = async (e) => {
    e.preventDefault();

    if (password !== password2 || !password) {
      return setError(true)
    } else {
      setError(false)
    }

    try {
      await publishPost({
        variables: {
          name, email, password, bio,
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const exec = (f) => (e) => {
    e.preventDefault();
    f(e.target.value);
  }

  return (
    <>
      <h1 style={{ textAlign: 'left', marginTop: 0 }}>Register</h1>
      <Card sx={{ padding: '16px', bgcolor: '#f9f9f9' }}>
        <form onSubmit={submit}>
          <Grid container direction='column'>
            <Input
              type='text'
              value={name}
              placeholder='Name'
              onChange={exec(setName)}
            />

            <Input
              onChange={exec(setEmail)}
              type='text'
              value={email}
              placeholder='Email'
            />

            <Input
              type='text'
              value={bio}
              placeholder='Bio'
              onChange={exec(setBio)}
            />

            <Input
              error={error}
              type='password'
              value={password}
              placeholder='Password'
              onChange={exec(setPassword)}
            />

            <Input
              error={error}
              type='password'
              value={password2}
              placeholder='Confirm Password'
              onChange={exec(setPassword2)}
            />

            {error && <InputLabel children='Password does not match' error={error} />}

            <Grid>
              {loading && <CircularProgress size={16} />}
              <Button type='submit'>Register</Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  )
}

export default RegisterFormComponent;
