import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VehicleList from './VehicleList';

const vehiclesMock = [{ id: 0, modelo: 'Fusca', valor: 800, ano: 2030, marca: {id:0, nome:'Fiat'} }];
jest.mock('../../services/VehicleService', () => ({
  delete: jest.fn().mockResolvedValue(),
  getAll: jest.fn().mockResolvedValue(vehiclesMock),
}));

describe('<VehicleList />', () => {
  const history = createMemoryHistory();

  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => render(
      <Router history={history}>
        <VehicleList />
      </Router>
    ));
  });

  it('Should redirect to vehicle update route when user click on update button', async () => {
    const updateBtn = screen.getByRole('button', { name: 'Alterar' });
    const vehicleSelected = await screen.findByText(vehiclesMock[0].modelo);
    userEvent.click(vehicleSelected);
    userEvent.click(updateBtn);

    expect(history.location.pathname).toBe('/alteracao-veiculo/'+vehiclesMock[0].id);
  });
  it('Should delete item', async () => {
    const deleteBtn = screen.getByRole('button', { name: 'Excluir' });
    const vehicleSelected = await screen.findByText(vehiclesMock[0].modelo);
    userEvent.click(vehicleSelected);
    userEvent.click(deleteBtn);
    expect(vehicleSelected).not.toBeInTheDocument();
  });
  it('Should redirect to "cadastro-veiculo" when press "incluir" button', () => {
    const createBtn = screen.getByRole('button', { name: 'Incluir' });
    userEvent.click(createBtn);
    expect(history.location.pathname).toBe('/cadastro-veiculo');
  });
  it('Should render list lines', async () => {
    expect(await screen.findByText(vehiclesMock[0].modelo)).toBeInTheDocument();
  });
});
