import {AxiosInstance} from 'axios';
import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute,} from '../const';
import { Offer, Offers } from '../types/offers.js';
import { UserData } from '../types/user.js';
import { AuthData } from '../types/auth-data.js';

export const redirectToRoute = createAction<AppRoute>('route/redirectToRoute');

type ThunkShape = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
export type FavoriteParams = {
  id: number;
  status: number;
};

export const fetchOffersAction = createAsyncThunk<Offers, undefined, ThunkShape>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkShape>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkShape>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkShape>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const setFavoritesAction = createAsyncThunk<Offer, FavoriteParams, ThunkShape
 >(
   'favorite/setFavorite',
   async({id, status}, {dispatch, extra: api}) => {
     const { data } = await api.post<Offer>(`${APIRoute.Favorites}/${id}/${status}`);
     return data;
   }
 );
