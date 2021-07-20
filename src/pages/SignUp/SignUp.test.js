import React from 'react';
import { Router } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserService from '../../services/UserService';
import SignUp from './SignUp';
import { createMemoryHistory } from 'history';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const userCreateSpy = jest.spyOn(UserService, 'create');

const userMock = {
  id: 1,
  username: 'User',
  password: '123',
  password2: '123',
};

let testLocation;

const setup = () => {
  const history = createMemoryHistory();

  return render(
    <Router history={history}>
      <SignUp />
    </Router>
  );
};

describe('SignUp /> rendering', () => {
  beforeEach(async () => {
    await act(async () => setup());
  });

  it('Should render <SignUp />', () => {
    const inputUsername = screen.getByRole('textbox', {
      name: /Nome Completo/i,
    });
    const inputPassword = screen.getByLabelText(/^Senha/i);
    const inputPassword2 = screen.getByLabelText(/Confirme sua Senha/i);
    const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });
    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });

    expect(inputUsername).toBeVisible();

    expect(inputPassword).toBeVisible();
    expect(inputPassword).toHaveAttribute('type', 'password');

    expect(inputPassword2).toBeVisible();
    expect(inputPassword2).toHaveAttribute('type', 'password');

    expect(submitBtn).toBeVisible();
    expect(cancelBtn).toBeVisible();
  });

  describe('<SignUp /> creating', () => {
    beforeEach(async () => {
      const inputUsername = screen.getByRole('textbox', {
        name: /Nome Completo/i,
      });
      const inputPassword = screen.getByLabelText(/^Senha/i);
      const inputPassword2 = screen.getByLabelText(/Confirme sua Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

      userEvent.type(inputUsername, userMock.username);
      userEvent.type(inputPassword, userMock.password);
      userEvent.type(inputPassword2, userMock.password2);
      await act(async () => userEvent.click(submitBtn));
    });

    it('Should call create with correct params', () => {
      expect(userCreateSpy).toBeCalledWith(
        expect.objectContaining({
          username: userMock.username,
          password: userMock.password,
          password2: userMock.password2,
        })
      );
    });

    describe('SignUp with rejected value', () => {
      beforeAll(async () => {
        userCreateSpy.mockRejectedValue({
          message: 'Erro no cadastro do usuário',
          status: '400',
        });
      });

      it('Should show error message', async () => {
        const error = await screen.findByText(/Erro no cadastro do usuário/i);
        expect(error).toBeInTheDocument();
      });
    });
  });
});
