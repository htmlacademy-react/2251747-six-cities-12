
import {createAction} from '@reduxjs/toolkit';
import { City, Offers } from '../types/offers';

export const ActiveCityAction = {
  SET_CITY: 'activeCity/setCity',
  SET_OFFERS: 'activeCity/setOffers',
};

export const setCity = createAction(ActiveCityAction.SET_CITY, (value: City) => ({
  payload: value,
}));
export const setOffers = createAction(ActiveCityAction.SET_OFFERS, (value: Offers) => ({
  payload: value,
}));
