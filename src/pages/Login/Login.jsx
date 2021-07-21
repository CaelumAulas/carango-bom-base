import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { Authenticate } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    await Authenticate({ username, password });
    history.push('/marcas');
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              logar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to={{ pathname: '/cadastrar' }}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
            >
              registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;
