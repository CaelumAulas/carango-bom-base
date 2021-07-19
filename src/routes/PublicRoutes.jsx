import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from '../pages/SignUp/SignUp';
import VehicleList from '../pages/Vehicle/VehicleList/VehicleList';
import Login from '../pages/Login/Login';

function PublicRoutes() {
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
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default PublicRoutes;
