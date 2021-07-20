import { Button, TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useErros from '../../../hooks/useErros';
import AuthService from '../../../services/Auth/AuthService';
import { confirmarSenha, validarEmail, validarSenha } from '../validacoes';

const Cadastro = () => {
  const [cadastroEmail, setCadastroEmail] = useState('');
  const [cadastroSenha, setCadastroSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const [alert, setAlert] = useState(false);

  const history = useHistory();

  const validacoes = {
    email: (dado) => validarEmail(dado),
    senha: (dado) => validarSenha(dado),
    confirmacaoSenha: (dado) => {
      const validacaoSenha = validacoes.senha(dado);
      if (!validacaoSenha.valido) {
        return validacaoSenha;
      }
      return confirmarSenha(dado, cadastroSenha);
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  return (
    <form
      data-testid="cadastroForm"
      onSubmit={async (e) => {
        e.preventDefault();
        if (possoEnviar()) {
          await AuthService.cadastrar({
            email: cadastroEmail,
            senha: cadastroSenha,
          })
            .then(() => {
              history.push('/usuarios');
            })
            .catch(() => {
              setAlert(true);
            });
        }
      }}
    >
      <TextField
        value={cadastroEmail}
        onChange={(e) => setCadastroEmail(e.target.value)}
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
        value={cadastroSenha}
        onChange={(e) => setCadastroSenha(e.target.value)}
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
        label="Confirmação de senha"
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
          Erro ao cadastrar o usuário!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Cadastro;
