import React from 'react';
import { render } from '@testing-library/react';

import ListagemMarcas from '../pages/ListagemMarcas';

// const brandsMock = [{ id: 0, nome: "Fiat" }];
// jest.mock("../services/MarcaService", () => ({
//   listar: jest.fn().mockResolvedValue(brandsMock),
// }));

describe('Listagem de Marcas', () => {
  it('Deve mostrar o label Marca', () => {
    const { getByText } = render(<ListagemMarcas />);

    const marcaLabel = getByText('Marca');

    expect(marcaLabel).toBeInTheDocument();
  });
  // it('Deve renderizar as linhas vindas da API', ()=>{

  // })
});
