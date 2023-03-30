import {createReducer} from '@reduxjs/toolkit';
import { City, Offers } from '../types/offers';
import {setCity, setOffers} from './actions';

const initialState: {city: City | null; offers: Offers} = {
  city: null,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
