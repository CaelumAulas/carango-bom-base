import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={login}
        onChange={(evt) => setLogin(evt.target.value)}
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

      <Button type="submit" fullWidth variant="contained" color="primary">
        logar
      </Button>
    </form>
  );
}

export default Login;
