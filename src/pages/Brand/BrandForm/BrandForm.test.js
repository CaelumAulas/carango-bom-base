import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BrandForm from './BrandForm';

const brandsMock = [{ id: 0, nome: 'Fiat' }];
jest.mock('../../services/BrandService', () => ({
  getAll: jest.fn().mockResolvedValue(brandsMock),
  delete: jest.fn().mockResolvedValue(),
}));

describe('<BrandForm />', () => {
  const history = createMemoryHistory();
  const setup = () =>
    render(
      <Router history={history}>
        <BrandForm />
      </Router>
    );

  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => setup());
  });

  it('Should render the component', async () => {
    const deleteBtn = screen.getByRole('button', { name: 'Excluir' });
    const updateBtn = screen.getByRole('button', { name: 'Alterar' });
    const createBtn = screen.getByRole('button', { name: 'Incluir' });

    expect(createBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
  });
  it('Should redirect to "cadastro-marcas" when press "incluir" button', () => {
    const createBtn = screen.getByRole('button', { name: 'Incluir' });
    userEvent.click(createBtn);
    expect(history.location.pathname).toBe('/cadastro-marca');
  });
  it('Should redirect to brand update route when user click on update button', async () => {
    const updateBtn = screen.getByRole('button', { name: 'Alterar' });
    const brandSelected = await screen.findByText('Fiat');
    userEvent.click(brandSelected);
    userEvent.click(updateBtn);

    expect(history.location.pathname).toBe('/alteracao-marca/0');
  });
  it('Should delete item', async () => {
    const deleteBtn = screen.getByRole('button', { name: 'Excluir' });
    const brandSelected = await screen.findByText('Fiat');
    userEvent.click(brandSelected);
    userEvent.click(deleteBtn);
    expect(brandSelected).not.toBeInTheDocument();
  });
  it('Should render list lines', async () => {
    expect(await screen.findByText('Fiat')).toBeInTheDocument();
  });
});
