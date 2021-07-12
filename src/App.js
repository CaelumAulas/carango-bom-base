import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp/SignUp';
import UserList from './pages/UserList/UserList';
import BrandList from './pages/Brand/BrandList/BrandList';
import BrandRegister from './pages/Brand/BrandRegister/BrandRegister';
import VehicleList from './pages/VehicleList/VehicleList';
import Login from './pages/Login/Login';

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
              <Route exact path="/">
                <Login></Login>
              </Route>
              <Route path="/marca/cadastro-marca">
                <BrandRegister></BrandRegister>
              </Route>
              <Route path="/marca/alteracao-marca/:id">
                <BrandRegister></BrandRegister>
              </Route>
              <Route path="/marcas">
                <BrandList></BrandList>
              </Route>
              <Route path="/cadastrar">
                <SignUp></SignUp>
              </Route>
              <Route path="/veiculos">
                <VehicleList />
              </Route>
              <Route path="/usuarios">
                <UserList />
              </Route>
              <Route path="/">
                <Login></Login>
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
