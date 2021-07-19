import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import SignUp from '../pages/SignUp/SignUp';
import UserList from '../pages/UserList/UserList';
import BrandList from '../pages/Brand/BrandList/BrandList';
import BrandRegister from '../pages/Brand/BrandRegister/BrandRegister';
import VehicleList from '../pages/Vehicle/VehicleList/VehicleList';
import VehicleRegister from '../pages/Vehicle/VehicleRegister/VehicleRegister';
import Login from '../pages/Login/Login';

function PrivateRoute({ children, ...rest }) {
  const { signed } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return signed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Login></Login>
      </Route>
      <Route path="/cadastrar">
        <SignUp></SignUp>
      </Route>
      <Route path="/veiculos">
        <VehicleList />
      </Route>
      <PrivateRoute path="/marcas">
        <BrandList></BrandList>
      </PrivateRoute>
      <PrivateRoute path="/marca/cadastro-marca">
        <BrandRegister></BrandRegister>
      </PrivateRoute>
      <PrivateRoute path="/marca/alteracao-marca/:id">
        <BrandRegister></BrandRegister>
      </PrivateRoute>
      <PrivateRoute path="/marcas">
        <BrandList></BrandList>
      </PrivateRoute>
      <PrivateRoute path="/veiculo/cadastro-veiculo">
        <VehicleRegister></VehicleRegister>
      </PrivateRoute>
      <PrivateRoute path="/veiculo/alteracao-veiculo/:id">
        <VehicleRegister></VehicleRegister>
      </PrivateRoute>
      <PrivateRoute path="/usuarios">
        <UserList />
      </PrivateRoute>
      <PrivateRoute path="/veiculos">
        <VehicleList />
      </PrivateRoute>
    </Switch>
  );
}

export default Routes;
