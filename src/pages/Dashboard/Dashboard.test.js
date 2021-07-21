import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Dashboard, {sumVehiclesPrice} from './Dashboard'

const vehiclesMock = {content:[{
  "id": 0,
  "marca": {
    "id": 1,
    "nome": "mock"
  },
  "model": "Teste",
  "price": 250,
  "year": 1890
},
{
  "id": 1,
  "marca": {
    "id": 0,
    "nome": "string"
  },
  "model": "Fit",
  "price": 450,
  "year": 1900
},
{
  "id": 2,
  "marca": {
    "id": 0,
    "nome": "string"
  },
  "model": "Novo",
  "price": 6890,
  "year": 1998
},
{
  "id": 3,
  "marca": {
    "id": 0,
    "nome": "string"
  },
  "model": "Seila",
  "price": 9000,
  "year": 2020
}]};
jest.mock('../../services/VehicleService', () => ({
  getAll: jest.fn().mockResolvedValue(vehiclesMock),
  delete: jest.fn().mockResolvedValue(),
}));
describe('<Dashboard />',()=>{
  const setup = () =>
    render(
        <Dashboard />
    );
  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => setup());
  });

  it('Should display brands', async ()=>{
    let text = await screen.findByText('mock')
    expect(text).toBeInTheDocument();
  })
  it('Should show total vehicles per brand', async ()=>{
    let textTotal = await screen.findByText('3 veículos')
    expect(textTotal).toBeInTheDocument();
  })
  it('Should display total value of vehicles per brand',()=>{
    expect(sumVehiclesPrice(vehiclesMock.content)).toEqual(16590);
  })
})