import {State} from '../types/state';
import {Offers, City} from '../types/offers';
import { UserData } from '../types/user';
import { AuthorizationStatus } from '../const';

export const getCity = (state: State): City | null => state.city;
export const getOffers = (state: State): Offers => state.offers;
export const getOfferId = (state: State): number | null => state.activeOfferId;
export const getActiveSort = (state: State): string => state.activeSort;
export const getUser = (state: State): UserData | null => state.user;
export const getAuthStatus = (state: State): AuthorizationStatus => state.authorizationStatus;
