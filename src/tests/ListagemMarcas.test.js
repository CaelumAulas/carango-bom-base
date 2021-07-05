import React from 'react';
import { screen, render } from '@testing-library/react';

import ListagemMarcas from '../pages/ListagemMarcas';

describe('Listagem de Marcas', () => {
  it('Deve renderizar o componente', () => {
    render(<ListagemMarcas />);

    expect(screen.getByTestId('btn-cadastro')).toBeInTheDocument();
    expect(screen.getByTestId('btn-excluir')).toBeInTheDocument();
    expect(screen.getByTestId('btn-alterar')).toBeInTheDocument();
  });
});
