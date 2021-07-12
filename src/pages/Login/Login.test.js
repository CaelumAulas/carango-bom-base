import React from 'react';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AuthService from '../../services/AuthService';
import { AuthProvider } from '../../contexts/auth';

import Login from './Login';

describe('<Login/>', () => {
  const history = createMemoryHistory();
  const authSpy = jest.spyOn(AuthService, 'loginTest');
  const userTest = { login: 'teste@example.com', password: '12345' };
  const setup = () =>
    render(
      <AuthProvider>
        <Router history={history}>
          <Login />
        </Router>
      </AuthProvider>
    );

  beforeEach(async () => {
    setup();
  });
  afterEach(() => {
    jest.clearAllMocks();
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

  it('Should call login with the correct credentials', async () => {
    const { login, password } = userTest;
    userEvent.type(screen.getByRole('textbox', { name: 'Email' }), login);
    userEvent.type(screen.getByText('Password'), password);

    const leftClick = { button: 0 };
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: 'logar' }), leftClick)
    );
    expect(authSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        login,
        password,
      })
    );
  });

  it('Should redirect the user to "/cadastrar" when click register button', () => {
    const registerBtn = screen.getByRole('button', { name: 'registrar' });
    userEvent.click(registerBtn);

    expect(history.location.pathname).toBe('/cadastrar');
  });
});
