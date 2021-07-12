import React from "react";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BrandForm from "./BrandForm";

const getId
const brandsMock = [{ id: 0, nome: "Fiat" }];
jest.mock("../../../services/BrandService", () => ({  
  getById: jest.fn().mockResolvedValue(brandsMock),
  delete: jest.fn().mockResolvedValue(),
}));

describe("<BrandForm />", () => {
  const history = createMemoryHistory();
  const setup = ({ path }) =>
    render(
      <Router history={history}>
        <Route path={path}>
          <BrandForm />
        </Route>
      </Router>
    );

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("Should load brand name if route has it's id", async () => {
    const { getByText } = setup({ path: "/cadastro-marca" });
    console.log(history.location.pathname);
    expect(history.location.pathname).toBe("/cadastro-marca");
    expect(screen.getByText("Fiat")).toBeInTheDocument();
  });

  // it("Should render the component", async () => {
  //   const updateBtn = screen.getByRole("button", { name: "Alterar" });
  //   const createBtn = screen.getByRole("button", { name: "Incluir" });

  //   expect(createBtn).toBeInTheDocument();
  //   expect(updateBtn).toBeInTheDocument();
  // });

  // it('Should redirect to "marcas" when press "incluir" button', () => {
  //   const createBtn = screen.getByRole("button", { name: "Incluir" });
  //   userEvent.click(createBtn);
  //   expect(history.location.pathname).toBe("/marcas");
  // });

  // it("Should redirect to brand update route when user click on update button", async () => {
  //   const updateBtn = screen.getByRole("button", { name: "Alterar" });
  //   const brandSelected = await screen.findByText("Fiat");
  //   userEvent.click(brandSelected);
  //   userEvent.click(updateBtn);

  //   expect(history.location.pathname).toBe("/marcas");
  // });
});
