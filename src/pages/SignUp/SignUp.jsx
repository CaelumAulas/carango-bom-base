import { Grid, Button, Paper, TextField, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserService from '../../services/UserService';
import './SignUp.css';

export default function SignUp() {
  function handleSubmit(e) {
    e.preventDefault();

    if (name !== '' && password !== '' && reqPassword !== '') {
      if (password !== reqPassword) {
        alert('As senhas não estão iguais.');
      } else {
        window.location.href = '/usuarios';
      }
    } else {
      alert('Preencha todos os dados.');
    }
  }

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [reqPassword, setReqPassword] = useState('');
  const { id } = useParams();

  function cancelar() {
    window.location.href = '/usuarios';
  }

  useEffect(() => {
    if (id) {
      UserService.getById(id).then((m) => {
        m.setName(m.Name);
      });
    }
  }, [id]);

  return (
    <div className="root">
      <Container maxWidth="lg" className="container">
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <h2>Cadastro de Usuarios</h2>
            <Paper className="paper">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nome Completo"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    fullWidth
                    autoComplete="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    fullWidth
                    autoComplete="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="reqPassword"
                    name="reqPassword"
                    label="Confirme sua Senha"
                    type="password"
                    value={reqPassword}
                    onChange={(e) => {
                      setReqPassword(e.target.value);
                    }}
                    fullWidth
                    autoComplete="reqPassword"
                  />
                </Grid>
                <Grid item container xs={12} sm={12}>
                  <Grid item sm={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {id ? 'Alterar' : 'Incluir'}
                    </Button>
                  </Grid>
                  <Grid item sm={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={cancelar}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
