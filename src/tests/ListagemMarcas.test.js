import React from 'react';
import { render } from '@testing-library/react';

import ListagemMarcas from '../pages/ListagemMarcas';

describe('Listagem de Marcas', () => {
  it('Deve mostrar o label Marca', () => {
    const { getByText } = render(<ListagemMarcas />);

    const marcaLabel = getByText('Marca');

    expect(marcaLabel).toBeInTheDocument();
  });
});
