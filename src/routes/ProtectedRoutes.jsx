import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import UserList from '../pages/UserList/UserList';
import BrandList from '../pages/Brand/BrandList/BrandList';
import BrandRegister from '../pages/Brand/BrandRegister/BrandRegister';
import VehicleList from '../pages/Vehicle/VehicleList/VehicleList';
import VehicleRegister from '../pages/Vehicle/VehicleRegister/VehicleRegister';
import Dashboard from '../pages/Dashboard/Dashboard';

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

function ProtectedRoutes() {
  return (
    <Switch>
      <PrivateRoute path="/marcas">
        <BrandList />
      </PrivateRoute>
      <PrivateRoute path="/marca/cadastro-marca">
        <BrandRegister />
      </PrivateRoute>
      <PrivateRoute path="/marca/alteracao-marca/:id">
        <BrandRegister />
      </PrivateRoute>
      <PrivateRoute path="/veiculo/cadastro-veiculo">
        <VehicleRegister />
      </PrivateRoute>
      <PrivateRoute path="/veiculo/alteracao-veiculo/:id">
        <VehicleRegister />
      </PrivateRoute>
      <PrivateRoute path="/usuarios">
        <UserList />
      </PrivateRoute>
      <PrivateRoute path="/veiculos">
        <VehicleList />
      </PrivateRoute>
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <Route path="*">
        <Redirect to="/marcas" />
      </Route>
    </Switch>
  );
}

export default ProtectedRoutes;
