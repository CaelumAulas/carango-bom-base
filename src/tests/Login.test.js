import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login';

describe('Página de Login', () => {
  it('Deve ter o formulário de login', () => {
    const { getByRole, getByText } = render(<Login />);

    const inputEmail = getByRole('textbox', { name: 'Email' });
    const inputSenha = getByText('Password');
    const btnLogar = getByRole('button', { name: 'logar' });

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(btnLogar).toBeInTheDocument();
  });

  it('Deve logar o usuário', () => {
    render(<Login />);

    userEvent.type(
      screen.getByRole('textbox', { name: 'Email' }),
      'teste@teste.com'
    );
    userEvent.type(screen.getByText('Password'), '1234');

    const leftClick = { button: 0 };
    userEvent.click(screen.getByRole('button', { name: 'logar' }), leftClick);

    expect(screen.queryByText('Preencha este campo.')).not.toBeInTheDocument();
  });
});
