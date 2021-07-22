import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserList from './UserList';

const usersMock = [{ id: 0, username: 'Teste da Silva' }];
jest.mock('../../services/UserService', () => ({
  delete: jest.fn().mockResolvedValue(),
  getAll: jest.fn().mockResolvedValue(usersMock),
}));

fdescribe('<UserList />', () => {
  const history = createMemoryHistory();

  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () =>
      render(
        <Router history={history}>
          <UserList />
        </Router>
      )
    );
  });
  it('Should render list lines', async () => {
    expect(await screen.findByText(usersMock[0].username)).toBeInTheDocument();
  });

  it('Should redirect to user update route when user click on update button', async () => {
    const updateBtn = screen.getByRole('button', { name: /Alterar/i });
    const userSelected = await screen.findByText(usersMock[0].username);
    userEvent.click(userSelected);
    userEvent.click(updateBtn);

    expect(history.location.pathname).toBe(
      '/alteracao-usuario/' + usersMock[0].id
    );
  });
  it('Should delete item', async () => {
    const deleteBtn = screen.getByRole('button', { name: /Excluir/i });
    const userSelected = await screen.findByText(usersMock[0].username);
    userEvent.click(userSelected);
    userEvent.click(deleteBtn);
    expect(userSelected).not.toBeInTheDocument();
  });
  it('Should redirect to "cadastro-usuario" when press "incluir" button', () => {
    const createBtn = screen.getByRole('button', { name: /Incluir/i });
    userEvent.click(createBtn);
    expect(history.location.pathname).toBe('/cadastro-usuario');
  });
});
