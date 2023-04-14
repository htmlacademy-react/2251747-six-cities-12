import { NameSpace } from '../../const';
import { City, Offers } from '../../types/offers';
import { State } from '../../types/state';

export const getCity = (state: State): City | null => state[NameSpace.ActiveCity].city;
export const getOffers = (state: State): Offers => state[NameSpace.ActiveCity].offers;
export const getOfferId = (state: State): number | null => state[NameSpace.ActiveCity].activeOfferId;
export const getActiveSort = (state: State): string => state[NameSpace.ActiveCity].activeSort;
