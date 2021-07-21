import { API_URL } from '../Constants';

const AuthService = {
  login(credentials) {
    return fetch(API_URL + '/auth', {
      method: 'POST',
      contentType: 'application/json',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then((response) => response.json());
  },

  loginTest(credentials) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            token:
              '91j893h281h9nf98fnf2309jd09jkkd0as98238j9fr8j98f9j8f298r829r-f',
            user: {
              name: 'Daniel',
              email: 'daniel@tw.com',
            },
          },
        });
      }, 2000);
    });
  },
};

export default AuthService;
