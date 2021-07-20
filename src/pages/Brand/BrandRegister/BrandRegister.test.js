import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom';
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrandService from '../../../services/BrandService';

import BrandRegister from './BrandRegister';

const brandServiceRegisterSpy = jest.spyOn(BrandService, 'create');
const brandServiceGetByIdSpy = jest.spyOn(BrandService, 'getById');
brandServiceGetByIdSpy.mockResolvedValue({ id: 1, nome: 'Chevrolet' });

const brandServiceUpdateSpy = jest.spyOn(BrandService, 'update');

describe('<BrandRegister />', () => {
  let testLocation;
  const setup = (brandId) => {
    const path = brandId
      ? '/marca/alteracao-marca/:id'
      : '/marca/cadastro-marca';
    const entry = brandId
      ? `/marca/alteracao-marca/${brandId}`
      : '/marca/cadastro-marca';
    return render(
      <MemoryRouter initialEntries={['/marcas', entry]} initialIndex={1}>
        <Route path={path}>
          <BrandRegister />
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

  beforeEach(async () => {
    await act(async () => setup());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should show error if brand is not provided', async () => {
    const newBrand = '';
    const textBox = screen.getByRole('textbox', { name: /Marca/i });

    fireEvent.focus(textBox);
    userEvent.type(textBox, newBrand);
    fireEvent.blur(textBox);

    const errorMessage = await screen.findByText(
      'Marca deve ter ao menos 3 letras.'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should redirect to "/marcas" when the user press "cadastrar" with valid data', async () => {
    const newBrand = 'BMW';
    const textBox = screen.getByRole('textbox', { name: /Marca/i });
    const createBtn = screen.getByRole('button', { name: /Cadastrar/i });
    userEvent.type(textBox, newBrand);
    userEvent.click(createBtn);
    await waitFor(() => expect(testLocation.pathname).toEqual('/marcas'));
  });

  it('Should redirect to "/marcas" when the user press "cancelar" with valid data', async () => {
    const cancelBtn = screen.getByRole('button', { name: /cancelar/i });
    userEvent.click(cancelBtn);
    await waitFor(() => expect(testLocation.pathname).toEqual('/marcas'));
  });

  it('should register the brand that is typed into the input', async () => {
    const input = screen.getByRole('textbox', { name: /marca/i });

    userEvent.type(input, 'Volvo');
    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: /cadastrar/i }))
    );

    expect(brandServiceRegisterSpy).toHaveBeenCalledWith({ nome: 'Volvo' });
  });

  it('Should redirect to "/marcas" when the user press cancel', () => {
    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });
    userEvent.click(cancelBtn);
    expect(testLocation.pathname).toEqual('/marcas');
  });

  describe('Update Routes', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      await act(async () => setup(1));
    });

    it('Should return correct brand to the input', () => {
      const correctBrand = screen.getByDisplayValue(/chevrolet/i);
      expect(correctBrand).toBeInTheDocument();
    });

    it('Should call update with new Brand', async () => {
      const correctBrand = screen.getByDisplayValue(/chevrolet/i);
      userEvent.clear(correctBrand);
      userEvent.type(correctBrand, 'bmw');

      const updateButton = screen.getByRole('button', { name: /alterar/i });
      await act(async () => userEvent.click(updateButton));

      expect(brandServiceUpdateSpy).toBeCalledWith({ id: '1', nome: 'bmw' });
    });
  });
});
