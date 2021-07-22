import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AuthService from '../../../services/Auth/AuthService';
import { Login } from '../index';
import { changeInput, historyMock, testesUsario } from '../../../tests';

describe('Login', () => {
  const history = createMemoryHistory();
  history.push('/login');

  let pushSpy;

  beforeEach(() => {
    historyMock();
    pushSpy = jest.spyOn(history, 'push');
  });

  beforeEach(() => {
    render(
      <Router history={history}>
        <Route path="/login">
          <Login />
        </Route>
      </Router>
    );
  });

  testesUsario('loginForm');

  it('Deve habilitar o botão quando o form estiver preenchido corretamente na tela de Login', async () => {
    await changeInput('inputEmail', 'teste@valido.com');
    await changeInput('inputSenha', 's3nh4v4l1d4#');
    expect(await screen.getByTestId('submitButton')).toBeEnabled();
  });

  it('Deve enviar o Formulário com sucesso na tela de Login', async () => {
    jest.spyOn(AuthService, 'login').mockResolvedValue({
      token: 'TOKENJWT',
    });
    await changeInput('inputEmail', 'teste@valido.com');
    await changeInput('inputSenha', 's3nh4v4l1d4#');
    const button = screen.getByTestId('submitButton');
    await act(async () => {
      fireEvent.click(button);
    });
    expect(AuthService.login).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith('/dashboard');
  });

  it('Deve dar erro ao enviar o formulário na tela de Login', async () => {
    jest.spyOn(AuthService, 'login').mockRejectedValue({
      status: '401',
    });
    await changeInput('inputEmail', 'teste@valido.com');
    await changeInput('inputSenha', 's3nh4v4l1d4#');
    const button = screen.getByTestId('submitButton');
    await act(async () => {
      fireEvent.click(button);
    });
    expect(AuthService.login).toHaveBeenCalled();
    expect(await screen.getByText('Erro ao logar!')).toBeInTheDocument();
  });
});