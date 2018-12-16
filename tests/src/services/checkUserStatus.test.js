import checkUserStatus from '../../../src/services/checkUserStatus';

describe('TEST checkUserStatus()', () => {
  beforeEach(() => {
    localStorage.setItem('persist:root', JSON.stringify({ global: JSON.stringify({ isLoggedIn: true, isLoading: false }) }));
    localStorage.setItem('user', JSON.stringify({
      id: 8,
      fullName: 'Akanmu Christopher',
      email: 'akanmuchris@gmail.com',
      roleId: 3,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNihgfoutvuvbTQ0OTYwMTM1fQ.CcU4n0W_AjwUWU03qZ1deYp9NKpmYH-P-ADtFx1I9FE'
    }));
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should clear local storage if token is wrong', () => {
    checkUserStatus();
    expect(localStorage.__STORE__).toEqual({});
  });
});

describe('TEST checkUserStatus()', () => {
  beforeEach(() => {
    localStorage.setItem('persist:root', JSON.stringify({ global: JSON.stringify({ isLoggedIn: true, isLoading: false }) }));
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should clear local storage if no user object and isLoggedIn is true', () => {
    checkUserStatus();
    expect(localStorage.__STORE__).toEqual({});
  });
});
