import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import SignUp from '../pages/SignUp/SignUp';
import UserList from '../pages/UserList/UserList';
import BrandList from '../pages/Brand/BrandList/BrandList';
import BrandRegister from '../pages/Brand/BrandRegister/BrandRegister';
import VehicleList from '../pages/Vehicle/VehicleList/VehicleList';
import VehicleRegister from '../pages/Vehicle/VehicleRegister/VehicleRegister';
import Login from '../pages/Login/Login';

function Routes() {
  const { signed } = useAuth();

  return (
    <Switch>
      {signed ? (
        <Switch>
          <Route path="/marca/cadastro-marca">
            <BrandRegister></BrandRegister>
          </Route>
          <Route path="/marca/alteracao-marca/:id">
            <BrandRegister></BrandRegister>
          </Route>
          <Route path="/marcas">
            <BrandList></BrandList>
          </Route>
          <Route path="/veiculo/cadastro-veiculo">
            <VehicleRegister></VehicleRegister>
          </Route>
          <Route path="/veiculo/alteracao-veiculo/:id">
            <VehicleRegister></VehicleRegister>
          </Route>
          <Route path="/usuarios">
            <UserList />
          </Route>
          <Route path="/veiculos">
            <VehicleList />
          </Route>
        </Switch>
      ) : (
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
        </Switch>
      )}
    </Switch>
  );
}

export default Routes;
