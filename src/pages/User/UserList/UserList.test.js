import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UserList from "./UserList";

const usersMock = [
  { id: 0, name: "Andrey", password: "123", reqPassword: "123" },
];
jest.mock("../../../services/UserService", () => ({
  getAll: jest.fn().mockResolvedValue(usersMock),
  delete: jest.fn().mockResolvedValue(),
}));

describe("<UserList />", () => {
  const history = createMemoryHistory();
  const setup = () =>
    render(
      <Router history={history}>
        <UserList />
      </Router>
    );

  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => setup());
  });

  it("Should render the component", async () => {
    const deleteBtn = screen.getByRole("button", { name: "Excluir" });
    const updateBtn = screen.getByRole("button", { name: "Alterar" });
    const createBtn = screen.getByRole("button", { name: "Incluir" });

    expect(createBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
  });

  it('Should redirect to "cadastro-usuario" when press "incluir" button', () => {
    const createBtn = screen.getByRole("button", { name: "Incluir" });
    userEvent.click(createBtn);
    expect(history.location.pathname).toBe("/cadastro-usuario");
  });

  it("Should redirect to user update route when user click on update button", async () => {
    const updateBtn = screen.getByRole("button", { name: "Alterar" });
    const userSelected = await screen.findByText("Andrey");
    userEvent.click(userSelected);
    userEvent.click(updateBtn);

    expect(history.location.pathname).toBe("/alteracao-usuario/0");
  });

  it("Should delete item", async () => {
    const deleteBtn = screen.getByRole("button", { name: "Excluir" });
    const userSelected = await screen.findByText("Andrey");
    userEvent.click(userSelected);
    userEvent.click(deleteBtn);
    expect(userSelected).not.toBeInTheDocument();
  });

  it("Should render list lines", async () => {
    expect(await screen.findByText("Andrey")).toBeInTheDocument();
  });
});
