import {
  Grid,
  Button,
  Paper,
  TextField,
  makeStyles,
  Container,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useErros from "../hooks/useErros";
import UsuarioService from "../services/UsuarioService";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  containerButtons: {
    display: "flex",
    width: "30%",
    justifyContent: "space-between",
    float: "right",
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: 15,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function CadastroUsuario() {
  function handleSubmit() {
    const data = {
      nome: nome,
      senha: senha,
      senhaReq: senhaReq,
    };

    console.log(data);

    if (nome !== "" && senha !== "" && senhaReq !== "") {
      // TODO implentar
      // const response = awai api.post('api/usuarios, data');
      if (senha !== senhaReq) {
        alert("As senhas não estão iguais.");
      } else {
        window.location.href = "/usuarios";
      }
    } else {
      alert("Preencha todos os dados.");
    }
  }

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaReq, setSenhaReq] = useState("");
  const { id } = useParams();
  const classes = useStyles();

  const [erros, validarCampos, possoEnviar] = useErros();

  function cancelar() {
    window.location.href = "/usuarios";
  }

  // useEffect(() => {
  //     if (id) {
  //         UsuarioService.consultar(id)
  //             .then(m => setUsuario(m.nome));
  //     }
  // }, [id]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <h2>Cadastro de Usuarios</h2>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="nome"
                    name="nome"
                    label="Nome Completo"
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                    }}
                    fullWidth
                    autoComplete="nome"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="senha"
                    name="senha"
                    label="Senha"
                    type="password"
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                    fullWidth
                    autoComplete="senha"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="senhaReq"
                    name="senhaReq"
                    label="Confirme sua Senha"
                    type="password"
                    value={senhaReq}
                    onChange={(e) => {
                      setSenhaReq(e.target.value);
                    }}
                    fullWidth
                    autoComplete="senhaReq"
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
                      Confirmar
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
