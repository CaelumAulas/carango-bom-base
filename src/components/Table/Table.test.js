import React from 'react';
import { screen, render, act } from '@testing-library/react';
import Table from './Table';
import userEvent from '@testing-library/user-event';

const brandsMock = [{ id: 0, nome: 'Fiat' }];
const columns = [{ field: 'nome', headerName: 'Marca', width: 200 }];
const rowSelectedFunctionMock = jest.fn();

const setup = () =>
  render(
    <Table
      rows={brandsMock}
      columns={columns}
      addItem={() => {}}
      updateItem={() => {}}
      deleteItem={() => {}}
      selectedItem={null}
      rowSelectedFunction={rowSelectedFunctionMock}
    />
  );

beforeEach(async () => {
  await act(async () => setup());
});

describe('<Table />', () => {
  it('Should render list with buttons', () => {
    const excluirBtn = screen.getByRole('button', { name: 'Excluir' });
    const alterarBtn = screen.getByRole('button', { name: 'Alterar' });
    const cadastroBtn = screen.getByRole('button', { name: 'Incluir' });

    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(cadastroBtn).toBeInTheDocument();
    expect(excluirBtn).toBeInTheDocument();
    expect(alterarBtn).toBeInTheDocument();
  });

  it('Should render correct text from row', () => {
    expect(screen.getByText('Fiat')).toBeInTheDocument();
  });

  it('Should call function when row is selected', () => {
    const rowItem = screen.getByText('Fiat');
    userEvent.click(rowItem);
    expect(rowSelectedFunctionMock).toHaveBeenCalled();
  });
});
