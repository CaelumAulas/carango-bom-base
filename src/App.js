import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CadastroMarca from './pages/CadastroMarca';
import BrandList from './pages/BrandList/BrandList';
import VehicleList from './pages/VehicleList/VehicleList';
import Login from './pages/Login/Login';
import CadastroUsuario from './pages/CadastroUsuario';

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
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container component="article" maxWidth="md">
            <Switch>
              <Route path="/cadastro-marca">
                <CadastroMarca></CadastroMarca>
              </Route>
              <Route path="/alteracao-marca/:id">
                <CadastroMarca></CadastroMarca>
              </Route>
              <Route path="/marcas">
                <BrandList></BrandList>
              </Route>
              <Route path="/veiculos">
                <VehicleList />
              </Route>
              <Route path="/">
                <Login></Login>
              <Route path="/cadastro-usuario">
                <CadastroUsuario></CadastroUsuario>
              </Route>
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
