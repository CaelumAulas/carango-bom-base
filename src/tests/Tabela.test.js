import React from 'react';
import { screen, render } from '@testing-library/react';

import Tabela from '../components/Tabela';

describe('Tabela', () => {
  it('Deve renderizar o componente sem colunas', () => {
    render(<Tabela 
      linhas={[]}
      colunas={[]}
      addItem={()=>{}}
      updateItem={()=>{}}
      deleteItem={()=>{}}
      selectedItem={null}
      rowSelectedFunction={()=>{}}
      />);

    const excluirBtn = screen.getByTestId('btn-excluir');
    const alterarBtn = screen.getByTestId('btn-alterar');
    const cadastroBtn = screen.getByTestId('btn-cadastrar');
    
    expect(cadastroBtn).toBeInTheDocument();
    expect(excluirBtn).toBeInTheDocument();
    expect(alterarBtn).toBeInTheDocument();
  });
  it('Deve renderizar o componente com colunas', () => {
    const colunas = [{ field: 'nome', headerName: 'Marca', width: 200 }];
    render(<Tabela 
      linhas={[]}
      colunas={colunas}
      addItem={()=>{}}
      updateItem={()=>{}}
      deleteItem={()=>{}}
      selectedItem={null}
      rowSelectedFunction={()=>{}}
      />);

    const excluirBtn = screen.getByTestId('btn-excluir');
    const alterarBtn = screen.getByTestId('btn-alterar');
    const cadastroBtn = screen.getByTestId('btn-cadastrar');
    
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(cadastroBtn).toBeInTheDocument();
    expect(excluirBtn).toBeInTheDocument();
    expect(alterarBtn).toBeInTheDocument();
  });
});
