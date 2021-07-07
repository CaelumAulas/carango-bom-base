import React from 'react';
import { screen, render } from '@testing-library/react';

import ListagemMarcas from '../pages/ListagemMarcas';

// const brandsMock = [{ id: 0, nome: "Fiat" }];
// jest.mock("../services/MarcaService", () => ({
//   listar: jest.fn().mockResolvedValue(brandsMock),
// }));

describe('Listagem de Marcas', () => {
  it('Deve renderizar o componente', () => {
    const { getByText, getByLabelText } = render(<ListagemMarcas />);

    const excluirBtn = getByText('Excluir');
    const alterarBtn = getByText('Alterar');
    const cadastroBtn = getByText('Incluir');

    expect(cadastroBtn).toBeInTheDocument();
    expect(excluirBtn).toBeInTheDocument();
    expect(alterarBtn).toBeInTheDocument();
  });
  // it('Deve renderizar as linhas vindas da API', ()=>{

  // })
});
