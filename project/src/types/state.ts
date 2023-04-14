import { AuthorizationStatus, } from '../const.js';
import {store} from '../store/index.js';
import { City, Offers } from './offers.js';
import { UserData } from './user.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type ActiveCityState = {
  city: City | null;
  offers: Offers;
  isOffersDataLoading: boolean;
  activeOfferId: number | null;
  activeSort: string;
};
