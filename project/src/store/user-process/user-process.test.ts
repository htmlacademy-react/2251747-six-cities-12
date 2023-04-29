import { AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../mocks/mocks';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { userProcess } from './user-process';

const fakeUserData = makeFakeUserData();

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(
      userProcess.reducer(void 0, {
        type: 'UNKNOWN_ACTION'
      })
    ).toEqual(state);
  });

  describe('Action: checkAuthAction', () => {
    it('should update the status to "Auth" if checkAuthAction fulfilled', () => {
      expect(
        userProcess.reducer(state, {
          type: checkAuthAction.fulfilled.type
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      });
    });
    it('should update the status to "NoAuth" if checkAuthAction rejected', () => {
      expect(
        userProcess.reducer(state, {
          type: checkAuthAction.rejected.type
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      });
    });
  });
  describe('Action: loginAction', () => {
    it('should update the status to "Auth" and return "UserProcess" if loginAction fulfilled', () => {
      expect(
        userProcess.reducer(state, {
          type: loginAction.fulfilled.type,
          payload: fakeUserData
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserData,
      });
    });
    it('should update the status to "NoAuth" if loginAction rejected', () => {
      expect(
        userProcess.reducer(state, {
          type: loginAction.rejected.type
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      });
    });
  });
  describe('Action: logoutAction', () => {
    it('should update the status to "NoAuth" and return "UserProcess" if logoutAction fulfilled', () => {
      expect(
        userProcess.reducer({
          authorizationStatus: AuthorizationStatus.Auth,
          user: fakeUserData,
        }, {
          type: logoutAction.fulfilled.type,
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      });
    });
  });
});


