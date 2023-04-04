
import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { City, Offer, Offers } from '../types/offers';

export const ActiveCityAction = {
  SET_CITY: 'activeCity/setCity',
  SET_OFFERS: 'activeCity/setOffers',
  SET_OFFER_ID: 'activeCity/setOfferId',
  SET_ACTIVE_SORT: 'activeCity/setActiveSort',
};

export const setCity = createAction(ActiveCityAction.SET_CITY, (value: City) => ({
  payload: value,
}));
export const setOffers = createAction(ActiveCityAction.SET_OFFERS, (value: Offers) => ({
  payload: value,
}));
export const setOfferId = createAction(ActiveCityAction.SET_OFFER_ID, (offer: Offer) => ({
  payload: offer.id,
}));
export const setActiveSort = createAction(ActiveCityAction.SET_ACTIVE_SORT, (sort: string) => ({
  payload: sort,
}));
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('game/setError');

