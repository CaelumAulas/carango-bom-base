import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import { CadastroMarca, ListagemMarcas } from '../pages/Marca';
import { CadastroUsuario, ListagemUsuario, Login } from '../pages/Usuarios';
import { CadastroVeiculos, ListagemVeiculos } from '../pages/Veiculos';

function Routes() {
  const listaDeRotas = [
    {
      path: '/cadastro-marca',
      component: <CadastroMarca />,
    },
    {
      path: '/alteracao-marca/:id',
      component: <CadastroMarca />,
    },
    {
      path: '/cadastro-usuario',
      component: <CadastroUsuario />,
    },
    {
      path: '/alteracao-usuario/:id',
      component: <CadastroUsuario />,
    },
    {
      path: '/login',
      component: <Login />,
    },
    {
      path: '/usuarios',
      component: <ListagemUsuario />,
    },
    {
      path: '/veiculos',
      component: <ListagemVeiculos />,
    },
    {
      path: '/dashboard',
      component: <Dashboard />,
    },
    {
      path: '/cadastro-veiculos',
      component: <CadastroVeiculos />,
    },
    {
      path: '/alteracao-veiculos/:id',
      component: <CadastroVeiculos />,
    },
    {
      path: '/',
      component: <ListagemMarcas />,
      exact: true,
    },
  ];

  return listaDeRotas.map((route) => (
    <Route path={route.path} key={route.path} exact={route?.exact}>
      {route.component}
    </Route>
  ));
}

export default Routes;
