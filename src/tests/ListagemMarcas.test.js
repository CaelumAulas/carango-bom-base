import React from 'react';
import { screen, render } from '@testing-library/react';

import ListagemMarcas from '../pages/ListagemMarcas';

describe('Listagem de Marcas', () => {
  it('Deve renderizar o componente', () => {
    const { getByText, getByLabelText } = render(<ListagemMarcas />);

    const excluirBtn = getByText('Excluir');
    const alterarBtn = getByText('Alterar');
    const cadastroBtn = getByLabelText('add');

    expect(cadastroBtn).toBeInTheDocument();
    expect(excluirBtn).toBeInTheDocument();
    expect(alterarBtn).toBeInTheDocument();
  });
});
