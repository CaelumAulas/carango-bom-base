import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BrandRegister from './BrandRegister';

describe('<BrandRegister />', () => {
  const history = createMemoryHistory();
  const setup = () =>
    render(
      <Router history={history}>
        <BrandRegister />
      </Router>
    );

  beforeEach(async () => {
    await act(async () => setup());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should show error if brand is not provided', async () => {
    const newBrand = '';
    const textBox = screen.getByRole('textbox', { name: 'Marca' });

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
    const textBox = screen.getByRole('textbox', { name: 'Marca' });
    const createBtn = screen.getByRole('button', { name: 'Cadastrar' });
    userEvent.type(textBox, newBrand);
    userEvent.click(createBtn);
    await waitFor(() => expect(history.location.pathname).toEqual('/marcas'));
  });

  it('Should redirect to "/marcas" when the user press cancel', () => {
    const cancelBtn = screen.getByRole('button', { name: 'Cancelar' });
    userEvent.click(cancelBtn);
    expect(history.location.pathname).toEqual('/marcas');
  });
});
