import AuthService from './AuthService';

describe('AuthService', () => {
  describe('Login', () => {
    it('Deve Chamar a API de Login com sucesso', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => ({
          token: 'TOKENJWT',
        }),
      });
      const res = await AuthService.login({
        email: 'teste@teste.com',
        senha: 'teste',
      });
      expect(res.token).toBe('TOKENJWT');
    });

    it('Deve Chamar a API de Login com erro', async () => {
      jest.spyOn(global, 'fetch').mockRejectedValue({
        status: 401,
      });
      const res = await AuthService.login({
        email: 'teste@teste.com',
        senha: 'teste',
      });
      expect(res.status).toBe(401);
    });
  });
});