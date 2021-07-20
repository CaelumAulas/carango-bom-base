import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  IconButton,
  Divider,
} from '@material-ui/core';
import ToolBar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth } from '../../contexts/auth';
import './style.css';

import { Link, useHistory } from 'react-router-dom';

function CustomDrawer({ signed }) {
  const [open, setOpen] = useState(false);
  const { Logout } = useAuth();
  const history = useHistory();
  const publicRoutes = [
    {
      name: 'Login',
      path: '/',
    },
    { name: 'Veículos', path: '/veiculos' },
  ];

  const authenticateRoutes = [
    { name: 'Marcas', path: '/marcas' },
    { name: 'Usuários', path: '/usuarios' },
    { name: 'DashBoard', path: '/dashboard' },
  ];

  function renderLinks(routeObj) {
    return (
      <div key={routeObj.name}>
        <ListItem button component={Link} to={routeObj.path}>
          <ListItemText primary={routeObj.name} />
        </ListItem>
        <Divider />
      </div>
    );
  }

  function toggleVisibility() {
    setOpen(!open);
  }

  function handleLogout() {
    Logout();
    history.push('/');
  }

  return (
    <>
      <AppBar position="fixed">
        <ToolBar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleVisibility}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </ToolBar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleVisibility}>
        <List className="list">
          {signed
            ? authenticateRoutes.map(renderLinks)
            : publicRoutes.map(renderLinks)}
          {signed ? (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary={'Deslogar'} />
            </ListItem>
          ) : null}
        </List>
      </Drawer>
    </>
  );
}

export default CustomDrawer;
