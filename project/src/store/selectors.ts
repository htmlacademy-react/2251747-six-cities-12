import {State} from '../types/state';
import {Offers, City} from '../types/offers';

export const getCity = (state: State): City | null => state.city;
export const getOffers = (state: State): Offers => state.offers;
export const getOfferId = (state: State): number | null => state.activeOfferId;
export const getActiveSort = (state: State): string => state.activeSort;
