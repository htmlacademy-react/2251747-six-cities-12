import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute } from '../const';
import { StatusCodes } from 'http-status-codes';
import { makeFakeOffers, makeFakeUserData } from '../mocks/mocks';
import { FavoriteParams, checkAuthAction, fetchOffersAction, loginAction, logoutAction, redirectToRoute, setFavoritesAction, } from './api-action';
import { AuthData } from '../types/auth-data';
import { AUTH_TOKEN_KEY_NAME } from '../services/token';


describe('Async actions: userProcess', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const fakeUserData = makeFakeUserData();
  const fakeOffers = makeFakeOffers();

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  it('should authorization status is "AUTH" and load userData when server return 200', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should authorization status is AUTH', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should save token and load userData when POST /login', async () => {
    const fakeUser: AuthData = {
      login: 'test@test.ru',
      password: '123456'};


    mockAPI
      .onPost(APIRoute.Login)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, fakeUserData.token);
  });

  it('should fail POST /login', async () => {
    const fakeUser: AuthData = {
      login: 'test',
      password: '123456'};


    mockAPI
      .onPost(APIRoute.Login)
      .reply(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED, {error: 'error'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.rejected.type,
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(StatusCodes.NO_CONTENT);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should dispatch getFavorites when GET /favorites', async () => {
    const fakeOffer: FavoriteParams = {
      id: 1,
      status: 123};

    mockAPI.onGet(APIRoute.Favorites).reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(setFavoritesAction(fakeOffer));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      setFavoritesAction.pending.type,
      setFavoritesAction.rejected.type,
    ]);
  });
});

