import {createReducer} from '@reduxjs/toolkit';
import { SortOptions } from '../const';
import { City, Offers } from '../types/offers';
import {setActiveSort, setCity, setOfferId, setOffers} from './actions';

const initialState: {city: City | null; offers: Offers; activeOfferId: number | null; activeSort: string} = {
  city: null,
  offers: [],
  activeOfferId: null,
  activeSort: SortOptions.Popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    })
    .addCase(setActiveSort, (state, action) => {
      state.activeSort = action.payload;
    });
});

export {reducer};
