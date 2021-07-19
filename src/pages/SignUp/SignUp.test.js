import React from "react";
import { Route, MemoryRouter } from "react-router-dom";
import {
  act,
  render,
  screen,
  toBe
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserService from "../../services/UserService";
import SignUp from './SignUp';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const userCreateSpy = jest.spyOn(UserService, "create");
const userUpdateSpy = jest.spyOn(UserService, "update");
const userGetByIdSpy = jest.spyOn(UserService, "getById");
const userGetAllSpy = jest.spyOn(UserService, "getAll");

const userMock = {
  id: 1,
  username: "User",
  password: "123",
  password2: "123",
}

userGetByIdSpy.mockResolvedValue(userMock);

let testLocation;

const setup = (userId) => {
  const path = userId
    ? '/usuario/alteracao-usuario/:id'
    : '/usuario/cadastro-usuario/';
  const entry = userId
    ? `/usuario/alteracao-usuario/${userId}`
    : '/usuario/cadastro-usuario/';

  return render(
    <MemoryRouter initialEntries={['/usuarios', entry]} initialIndex={1}>
      <Route path={path}>
        <SignUp />
      </Route>
      <Route
        path="*"
        render={({ history, location }) => {
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );
};

describe('SignUp /> rendering', () => {

  beforeEach(async () => {
    await act(async () => setup());
  });

  it('Should render <SignUp />', () => {
    const inputUsername = screen.getByRole("textbox", { name: /Nome Completo/i });
    const inputPassword = screen.getByLabelText(/^Senha/i);
    const inputPassword2 = screen.getByLabelText(/Confirme sua Senha/i);
    const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });
    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });

    expect(inputUsername).toBeVisible();

    expect(inputPassword).toBeVisible();
    expect(inputPassword).toHaveAttribute('type', 'password');

    expect(inputPassword2).toBeVisible();
    expect(inputPassword2).toHaveAttribute('type', 'password');

    expect(submitBtn).toBeVisible();
    expect(cancelBtn).toBeVisible();
  });

  describe('Input validation', () => {
    beforeEach(async () => {
      const inputUsername = screen.getByRole('textbox', { name: /Nome Completo/i });
      const inputPassword = screen.getByLabelText(/^Senha/i);
      const inputPassword2 = screen.getByLabelText(/Confirme sua Senha/i);
      const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });

      userEvent.type(inputUsername, userMock.username);
      userEvent.type(inputPassword, userMock.password);
      userEvent.type(inputPassword2, userMock.password2);

      await act(async () => userEvent.click(submitBtn));
    });

    it('Should call create with correct params', () => {
      expect(userCreateSpy).toBeCalledWith(
        expect.objectContaining({
          username: userMock.username,
          password: userMock.password,
          password2: userMock.password2,
        })
      );
    });

    function usernameValidation(username) {
      if (!username) {
        throw new Error("Preencha o nome do usuário.");
      } else if (username.length < 3) {
        throw new Error("Usuário precisa ter 3 digitos ou mais.");
      }
    }

    function passwordValidation(password) {
      if (password === undefined) {
        throw new Error("Preencha a senha do usuário.");
      } else if (password.length < 3) {
        throw new Error("Senha precisa ter 3 digitos ou mais.");
      }
    }

    function password2Validation(password, password2) {
      if (password2 === undefined) {
        throw new Error("Confirme a senha do usuário.");
      } else if (password !== password2) {
        throw new Error("As senhas precisam ser iguais.");
      }
    }

    // Username
    it(`Should throw error with message \'Preencha o nome do usuário.\' when no username is provided`, () => {
      expect(() => {
        usernameValidation()
      }).toThrow('Preencha o nome do usuário.');
    });
    it(`Should throw error with message \'Usuário precisa ter 3 digitos ou mais.\' when username is less than 3 digits`, async () => {
      expect(() => {
        usernameValidation('ar')
      }).toThrow('Usuário precisa ter 3 digitos ou mais.');
    });

    // Password
    it(`Should throw error with message \'Preencha a senha do usuário.\' when no password is provided`, () => {
      expect(() => {
        passwordValidation()
      }).toThrow('Preencha a senha do usuário.');
    });
    it(`Should throw error with message \'Senha precisa ter 3 digitos ou mais.\' when password is less than 3 digits`, () => {
      expect(() => {
        passwordValidation('12')
      }).toThrow('Senha precisa ter 3 digitos ou mais.');
    });

    // Password2
    it(`Should throw error with message \'Confirme a senha do usuário.\' when password confirmation isn't provided`, () => {
      expect(() => {
        password2Validation('123')
      }).toThrow('Confirme a senha do usuário.');
    });
    it(`Should throw error with message \'As senhas precisam ser iguais.\' when password confirmation isn't provided`, () => {
      expect(() => {
        password2Validation('123', 'abc')
      }).toThrow('As senhas precisam ser iguais.');
    });
  });


  // describe('Button history validation', () => {
  //   beforeEach(async () => {
  //     const submitBtn = screen.getByRole('button', { name: /Cadastrar/i });
  //     const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });

  //     await act(async () => userEvent.click(cancelBtn));
  //   });

  //   it(`Should redirect to /'usuarios/' when /'Cancelar/' is clicked'`, () => {
  //     expect(mockHistoryPush).toHaveBeenCalledWith('/usuarios');
  //   });
  // });
});

describe('Route update', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await act(async () => setup(userMock.id));
  });

  it('Should fetch the correct user based on ID provided', () => {
    const inputUsername = screen.getByRole('textbox', { name: /Nome Completo/i });
    const inputPassword = screen.getByLabelText(/^Nova Senha/i);
    const inputPassword2 = screen.getByLabelText(/Confirme sua Senha/i);

    expect(inputUsername.value).toStrictEqual(userMock.username);
  })
})