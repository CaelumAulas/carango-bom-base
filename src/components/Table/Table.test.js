import React from "react";
import { screen, render, act } from "@testing-library/react";
import Table from "./Table";
import userEvent from '@testing-library/user-event'

const brandsMock = [{ id: 0, nome: "Fiat" }];
const colunas = [{ field: "nome", headerName: "Marca", width: 200 }];
const mockFun = jest.fn();

const setup = () =>
  render(
    <Table
      linhas={brandsMock}
      colunas={colunas}
      addItem={() => {}}
      updateItem={() => {}}
      deleteItem={() => {}}
      selectedItem={null}
      rowSelectedFunction={mockFun}
    />
  );

beforeEach(async () => {
  await act(async () => setup());
});

describe("<Table />", () => {
  it("Deve renderizar o componente com colunas", () => {
    const excluirBtn = screen.getByTestId("btn-excluir");
    const alterarBtn = screen.getByTestId("btn-alterar");
    const cadastroBtn = screen.getByTestId("btn-cadastrar");

    expect(screen.getByText("Marca")).toBeInTheDocument();
    expect(cadastroBtn).toBeInTheDocument();
    expect(excluirBtn).toBeInTheDocument();
    expect(alterarBtn).toBeInTheDocument();
  });
  it("Deve renderizar o componente com linhas", () => {
    expect(screen.getByText("Fiat")).toBeInTheDocument();
  });
  it('Deve chamar a função rowSelect ao ser selecionada', ()=>{
     userEvent.click(screen.getByText('Fiat')) 
      expect(mockFun).toHaveBeenCalled();
  })
});
