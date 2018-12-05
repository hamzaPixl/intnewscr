const configurationsServices = require('./configurationsServices');

describe('INT NEWS SCREEN - AUTH - services mock - configurationsServices', () => {
  it('should always create configurations', async () => {
    const resultService = await configurationsServices.createConfiguration();
    expect(resultService).toBeDefined();
  });
  it('should always get configurations', async () => {
    const resultService = await configurationsServices.getConfiguration();
    expect(resultService).toBeDefined();
  });
  it('should always get all configurations', async () => {
    const resultService = await configurationsServices.getAllConfigurations();
    expect(resultService).toBeDefined();
  });
  it('should always udpate configurations', async () => {
    const resultService = await configurationsServices.updateConfiguration();
    expect(resultService).toBeDefined();
  });
  it('should always delete configurations', async () => {
    const resultService = await configurationsServices.deleteConfiguration();
    expect(resultService).toBeDefined();
  });
  it('should always create view', async () => {
    const resultService = await configurationsServices.addView();
    expect(resultService).toBeDefined();
  });
  it('should always get view', async () => {
    const resultService = await configurationsServices.getView();
    expect(resultService).toBeDefined();
  });
  it('should always udpate view', async () => {
    const resultService = await configurationsServices.updateView();
    expect(resultService).toBeDefined();
  });
  it('should always delete view', async () => {
    const resultService = await configurationsServices.deleteView();
    expect(resultService).toBeDefined();
  });
});
