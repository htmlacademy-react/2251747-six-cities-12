import {State} from '../types/state';
import {Offers, City} from '../types/offers';

export const getCity = (state: State): City | null => state.city;
export const getOffers = (state: State): Offers => state.offers;
