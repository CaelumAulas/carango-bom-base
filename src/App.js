import React from 'react';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CadastroMarca from './pages/CadastroMarca';
import ListagemMarcas from './pages/ListagemMarcas';
import MenuLateral from './components/MenuLateral/MenuLateral.jsx';
import Rodape from './components/Rodape';
import './App.css';

const muiTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: blue[900],
      },
    },
  },
  ptBR
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={muiTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <MenuLateral className={classes.content}>
            <div className={classes.toolbar} />
            <Container component="article" maxWidth="md">
              <Switch>
                <Route path="/cadastro-marca">
                  <CadastroMarca></CadastroMarca>
                </Route>
                <Route path="/alteracao-marca/:id">
                  <CadastroMarca></CadastroMarca>
                </Route>
                <Route path="/">
                  <ListagemMarcas></ListagemMarcas>
                </Route>
              </Switch>
              <Rodape />
            </Container>
          </MenuLateral>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
