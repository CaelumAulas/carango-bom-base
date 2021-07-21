import {
  Grid,
  Button,
  Paper,
  TextField,
  Container,
  FormHelperText,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useForm from '../../hooks/useForm';
import validate from './SignUpValidationRules';
import userService from '../../services/UserService';

import './SignUp.css';

export default function SignUp() {
  const history = useHistory();
  const [error, setError] = useState('');
  const { handleChange, handleSubmit, values, errors } = useForm(
    validate,
    submitForm
  );

  function cancel() {
    history.push('/usuarios');
  }

  async function submitForm() {
    try {
      await userService.create(values)
      history.push('/usuarios');
    } catch (e) {
      setError(e.message);
    }
  }

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
                    id="username"
                    name="username"
                    label="Nome Completo"
                    value={values.username || ''}
                    onChange={handleChange}
                    fullWidth
                    autoComplete="username"
                  />
                  {errors.username && <p>{errors.username}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label={'Senha'}
                    type="password"
                    value={values.password || ''}
                    onChange={handleChange}
                    fullWidth
                    autoComplete="password"
                  />
                  {errors.password && <p>{errors.password}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password2"
                    name="password2"
                    label="Confirme sua Senha"
                    type="password"
                    value={values.password2 || ''}
                    onChange={handleChange}
                    fullWidth
                    autoComplete="password2"
                  />
                  {errors.password2 && <p>{errors.password2}</p>}
                </Grid>
                <Grid item container xs={12} sm={12}>
                  <Grid item sm={2}>
                    <Button
                      id="cadastrar"
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Cadastrar
                    </Button>
                  </Grid>
                  <Grid item sm={2}>
                    <Button
                      id="cancelar"
                      variant="contained"
                      color="secondary"
                      onClick={cancel}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                  {error ? (
                    <FormHelperText error>{error} </FormHelperText>
                  ) : null}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
