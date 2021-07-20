import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomDrawer from './CustomDrawer';
import { AuthProvider } from '../../contexts/auth';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const setup = (signed) =>
  render(
    <AuthProvider>
      <Router history={history}>
        <CustomDrawer signed={signed} />
      </Router>
    </AuthProvider>
  );

describe('CustomDrawer', () => {
  beforeEach(async () => {
    setup(false);
  });

  it('Should render the customDrawer closed', () => {
    const closedDrawer = screen.getByRole('button').firstChild.firstChild;
    expect(closedDrawer).toHaveAttribute('aria-hidden', 'true');
  });

  it('Should render the drawer with public links when user is not logged', () => {
    const closedDrawer = screen.getByRole('button');
    userEvent.click(closedDrawer);
    expect(screen.getByText(/veículos/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});

describe('CustomDrawer with user logged', () => {
  beforeEach(async () => {
    setup(true);
  });

  it('Should render the drawer with public links when user is logged', () => {
    const closedDrawer = screen.getByRole('button');
    userEvent.click(closedDrawer);

    expect(screen.getByText(/marcas/i)).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/usuários/i)).toBeInTheDocument();
  });

  it('Should remove user credentials from sessionstorage when user logout', () => {
    const closedDrawer = screen.getByRole('button');
    userEvent.click(closedDrawer);

    const loggoutButton = screen.getByRole('button', { name: /deslogar/i });
    userEvent.click(loggoutButton);

    expect(window.sessionStorage.getItem('@App:user')).toBe(null);
    expect(window.sessionStorage.getItem('@App:token')).toBe(null);
  });

  it('Should close on screen click', () => {
    userEvent.click(document.body);
    const closedDrawer = screen.getByRole('button').firstChild.firstChild;
    expect(closedDrawer).toHaveAttribute('aria-hidden', 'true');
  });
});
