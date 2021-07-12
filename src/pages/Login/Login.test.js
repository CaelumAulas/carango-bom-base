import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Login from './Login';

describe('<Login/>', () => {
  const history = createMemoryHistory();
  const setup = () =>
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

  beforeEach(async () => {
    jest.clearAllMocks();
    setup();
  });

  it('Should render the login component', () => {
    const inputEmail = screen.getByRole('textbox', { name: 'Email' });
    const inputPassword = screen.getByText('Password');
    const btnLogar = screen.getByRole('button', { name: 'logar' });
    const btnRegister = screen.getByRole('button', { name: 'registrar' });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogar).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('Should redirect the user to "/marcas" after login', () => {
    userEvent.type(
      screen.getByRole('textbox', { name: 'Email' }),
      'teste@teste.com'
    );
    userEvent.type(screen.getByText('Password'), '1234');

    const leftClick = { button: 0 };
    userEvent.click(screen.getByRole('button', { name: 'logar' }), leftClick);

    expect(history.location.pathname).toBe('/marcas');
  });

  it('Should redirect the user to "/cadastrar" when click register button', () => {
    const registerBtn = screen.getByRole('button', { name: 'registrar' });
    userEvent.click(registerBtn);

    expect(history.location.pathname).toBe('/cadastrar');
  });
});
