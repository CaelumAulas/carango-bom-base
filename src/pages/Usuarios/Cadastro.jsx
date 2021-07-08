import { Button, TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useErros from '../../hooks/useErros';
import AuthService from '../../services/Auth/AuthService';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const [alert, setAlert] = useState(false);

  const history = useHistory();

  const validacoes = {
    email: (dado) => {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          dado
        )
      ) {
        return { valido: true };
      }

      return { valido: false, texto: 'E-mail informado inválido.' };
    },
    senha: (dado) => {
      if (dado && dado.length >= 3) {
        return { valido: true };
      }
      return {
        valido: false,
        texto: 'A senha deve possuir ao menos 3 caracteres.',
      };
    },
    confirmacaoSenha: (dado) => {
      const validacaoSenha = validacoes.senha(dado);
      if (!validacaoSenha.valido) {
        return validacaoSenha;
      }
      if (dado !== senha) {
        return {
            valido: false,
            texto: 'As senhas devem ser iguais.',
        }
      }
      return {
        valido: true,
      };
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  return (
    <form
      data-testid="cadastroForm"
      onSubmit={async (e) => {
        e.preventDefault();
        if (possoEnviar()) {
          await AuthService.login({
            email,
            senha,
          })
            .then((data) => {
              console.log('TODO: Salvar o token!', data);
              history.push('/dashboard');
            })
            .catch(() => {
              setAlert(true);
            });
        }
      }}
    >
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validarCampos}
        helperText={erros.email.texto}
        error={!erros.email.valido}
        name="email"
        id="email"
        label="E-mail"
        type="email"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        data-testid="inputEmail"
      />

      <TextField
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        onBlur={validarCampos}
        helperText={erros.senha.texto}
        error={!erros.senha.valido}
        name="senha"
        id="senha"
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        data-testid="inputSenha"
      />

      <TextField
        value={confirmacaoSenha}
        onChange={(e) => setConfirmacaoSenha(e.target.value)}
        onBlur={validarCampos}
        helperText={erros.confirmacaoSenha.texto}
        error={!erros.confirmacaoSenha.valido}
        name="confirmacaoSenha"
        id="confirmacaoSenha"
        label="Confirmação de Senha"
        type="password"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        data-testid="inputConfirmacaoSenha"
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        data-testid="submitButton"
        disabled={!possoEnviar()}
      >
        Cadastrar
      </Button>

      <Button
        variant="contained"
        color="secondary"
        type="submit"
        data-testid="voltarButton"
        onClick={() => history.push('/usuarios')}
      >
        Voltar
      </Button>

      <Snackbar
        data-testeid="snackbar"
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(!alert)}
      >
        <Alert severity="error" title="Erro!">
          Erro ao logar!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Cadastro;
