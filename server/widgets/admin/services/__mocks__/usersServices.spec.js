const usersServices = require('./usersServices');

describe('INT NEWS SCREEN - AUTH - services mock - usersServices', () => {
  it('should always get ', async () => {
    const resultService = await usersServices.getProfil();
    expect(resultService).toBeDefined();
  });
});
