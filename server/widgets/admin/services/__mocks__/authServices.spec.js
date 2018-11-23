const authServices = require('./authServices');

describe('INT NEWS SCREEN - AUTH - services mock - authServices', () => {
  it('should always get ', async () => {
    const resultService = await authServices.login();
    expect(resultService).toBeDefined();
  });
});
