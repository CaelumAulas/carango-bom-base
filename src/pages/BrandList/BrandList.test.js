import React from 'react';
import { render } from '@testing-library/react';

import BrandList from './BrandList';

// const brandsMock = [{ id: 0, nome: "Fiat" }];
// jest.mock("../services/MarcaService", () => ({
//   listar: jest.fn().mockResolvedValue(brandsMock),
// }));

describe('<BrandList />', () => {
  it('Should render the component', () => {
    const { getByText } = render(<BrandList />);

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
