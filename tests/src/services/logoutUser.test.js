import logoutUser from '../../../src/services/logoutUser';

describe('TEST LOGOIT USER FUNCTION', () => {
  beforeEach(() => {
    localStorage.setItem('persist:root', JSON.stringify({ googleLoginReducer: { global: { isLoggedIn: true, isLoading: false } } }));
    localStorage.setItem('user', JSON.stringify({
      id: 8,
      fullName: 'Akanmu Christopher',
      email: 'akanmuchris@gmail.com',
      roleId: 3,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNihgfoutvuvbTQ0OTYwMTM1fQ.CcU4n0W_AjwUWU03qZ1deYp9NKpmYH-P-ADtFx1I9FE'
    }));
  });
  it('should clear locl storage', () => {
    logoutUser();
    expect(localStorage.__STORE__).toEqual({});
  });
});
