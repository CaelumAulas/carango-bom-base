import React from 'react';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AuthService from '../../services/AuthService';
import { AuthProvider } from '../../contexts/auth';

import Login from './Login';

describe('<Login/>', () => {
  const responseResolved = {
    data: {
      token: '91j893h281h9nf98fnf2309jd09jkkd0as98238j9fr8j98f9j8f298r829r-f',
      user: {
        name: 'Daniel',
        email: 'daniel@tw.com',
      },
    },
  };
  const history = createMemoryHistory();
  const authSpy = jest.spyOn(AuthService, 'loginTest');
  authSpy.mockResolvedValue(responseResolved);
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
    const inputEmail = screen.getByRole('textbox', { name: /Email/i });
    const inputPassword = screen.getByText('Password');
    const btnLogar = screen.getByRole('button', { name: /logar/i });
    const btnRegister = screen.getByRole('button', { name: /registrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogar).toBeInTheDocument();
    expect(btnRegister).toBeInTheDocument();
  });

  it('Should call login with the correct credentials', async () => {
    const { login, password } = userTest;
    userEvent.type(screen.getByRole('textbox', { name: /Email/i }), login);
    userEvent.type(screen.getByText('Password'), password);

    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /logar/i }))
    );
    expect(authSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        login,
        password,
      })
    );
  });

  it('Should have user credentials on localstorage', async () => {
    const { login, password } = userTest;
    userEvent.type(screen.getByRole('textbox', { name: /Email/i }), login);
    userEvent.type(screen.getByText('Password'), password);

    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /logar/i }))
    );

    const storageUser = JSON.parse(window.sessionStorage.getItem('@App:user'));
    const storageToken = window.sessionStorage.getItem('@App:token');

    expect(storageUser).toStrictEqual(responseResolved.data.user);
    expect(storageToken).toStrictEqual(responseResolved.data.token);
  });

  it('Should redirect the user to "/cadastrar" when click register button', () => {
    const registerBtn = screen.getByRole('button', { name: /registrar/i });
    userEvent.click(registerBtn);

    expect(history.location.pathname).toBe('/cadastrar');
  });
});
