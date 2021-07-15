import React from 'react';
import VehicleRegister from './VehicleRegister';
import { render, screen, act, fireEvent } from '@testing-library/react';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/VehicleService';
import { Route, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const brands = [
  { id: '1', nome: 'CHEVROLET' },
  { id: '2', nome: 'FIAT' },
  { id: '3', nome: 'VOLKS' },
];

const vehicleMock = {
  id: 1,
  model: 'suv',
  price: '20000',
  year: '2020',
  brand: brands[0],
};

const brandGetAllSpy = jest.spyOn(BrandService, 'getAll');
brandGetAllSpy.mockResolvedValue(brands);
const vehicleCreateSpy = jest.spyOn(VehicleService, 'create');
const vehicleGetByIdSpy = jest.spyOn(VehicleService, 'getById');
vehicleGetByIdSpy.mockResolvedValue(vehicleMock);
const vehicleUpdateSpy = jest.spyOn(VehicleService, 'update');

// eslint-disable-next-line no-unused-vars
let testLocation;
const setup = (vehicleId) => {
  const path = vehicleId
    ? '/veiculo/alteracao-veiculo/:id'
    : '/veiculo/cadastro-veiculo';
  const entry = vehicleId
    ? `/veiculo/alteracao-veiculo/${vehicleId}`
    : '/veiculo/cadastro-veiculo';
  return render(
    <MemoryRouter initialEntries={['/veiculos', entry]} initialIndex={1}>
      <Route path={path}>
        <VehicleRegister />
      </Route>
      <Route
        path="*"
        render={({ history, location }) => {
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );
};

describe('<VehicleRegister />', () => {
  beforeEach(async () => {
    await act(async () => setup());
  });

  it('Should render VehicleRegister with form', () => {
    const brandsSelect = screen.getByTestId('select');
    const inputVehicleModel = screen.getByRole('textbox', { name: /Modelo/i });
    const inputVehicleYear = screen.getByRole('textbox', { name: /Ano/i });
    const inputVehicleValue = screen.getByRole('textbox', { name: /Valor/i });
    const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });
    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });

    expect(brandsSelect).toBeInTheDocument();
    expect(inputVehicleModel).toBeInTheDocument();
    expect(inputVehicleYear).toBeInTheDocument();
    expect(inputVehicleValue).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });

  it('Should show error message when input model is invalid', async () => {
    const inputVehicleModel = screen.getByRole('textbox', { name: /Modelo/i });

    userEvent.type(inputVehicleModel, 'te');
    fireEvent.blur(inputVehicleModel);

    const errorMessage = await screen.findByText(
      /Modelo deve ter ao menos 3 letras./i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error message when input year is invalid', async () => {
    const inputVehicleYear = screen.getByRole('textbox', { name: /Ano/i });

    userEvent.type(inputVehicleYear, 'te');
    fireEvent.blur(inputVehicleYear);

    const errorMessage = await screen.findByText(
      /Ano deve ter ao menos 3 letras./i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error message when input price is invalid', async () => {
    const inputVehiclePrice = screen.getByRole('textbox', { name: /Valor/i });

    userEvent.type(inputVehiclePrice, 'te');
    fireEvent.blur(inputVehiclePrice);

    const errorMessage = await screen.findByText(
      /Valor deve ter ao menos 3 letras./i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  describe('<VehicleRegister /> all fields', () => {
    beforeEach(async () => {
      const inputVehicleModel = screen.getByRole('textbox', {
        name: /Modelo/i,
      });
      const inputVehicleYear = screen.getByRole('textbox', { name: /Ano/i });
      const inputVehicleValue = screen.getByRole('textbox', { name: /Valor/i });
      const brandsSelect = screen.getByRole('combobox');
      const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

      userEvent.type(inputVehicleModel, vehicleMock.model);
      userEvent.type(inputVehicleYear, vehicleMock.year);
      userEvent.type(inputVehicleValue, vehicleMock.price);
      userEvent.selectOptions(brandsSelect, vehicleMock.brand.nome);

      await act(async () => userEvent.click(submitBtn));
    });

    it('Should call create with correct params', () => {
      expect(vehicleCreateSpy).toBeCalledWith(
        expect.objectContaining({
          model: vehicleMock.model,
          year: vehicleMock.year,
          price: vehicleMock.price,
          brandId: vehicleMock.brand.id,
        })
      );
    });
    describe('With rejected value', () => {
      beforeAll(() => {
        vehicleCreateSpy.mockRejectedValue({
          message: 'Erro no cadastro do veículo',
          status: '400',
        });
      });

      it('Should show the error message', async () => {
        const error = await screen.findByText(/Erro no cadastro do veículo/i);
        expect(error).toBeInTheDocument();
      });
    });
  });
});
describe('<VehicleRegister /> with Spy update', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => setup(vehicleMock.id));
  });

  it('Should get the correct vehicle', () => {
    const brandsSelect = screen.getByRole('combobox');
    const inputVehicleModel = screen.getByRole('textbox', {
      name: /Modelo/i,
    });
    const inputVehicleYear = screen.getByRole('textbox', { name: /Ano/i });
    const inputVehicleValue = screen.getByRole('textbox', { name: /Valor/i });

    expect(brandsSelect.value).toStrictEqual(vehicleMock.brand.id);
    expect(inputVehicleModel.value).toStrictEqual(vehicleMock.model);
    expect(inputVehicleYear.value).toStrictEqual(vehicleMock.year);
    expect(inputVehicleValue.value).toStrictEqual(vehicleMock.price);
  });

  it('Should call update with correct params', () => {
    const inputVehicleYear = screen.getByRole('textbox', { name: /Ano/i });
    userEvent.clear(inputVehicleYear);
    userEvent.type(inputVehicleYear, '2050');

    const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

    userEvent.click(submitBtn);

    expect(vehicleUpdateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        brandId: '1',
        id: '1',
        model: 'suv',
        price: '20000',
        year: '2050',
      })
    );
  });
});
