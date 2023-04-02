import {createReducer} from '@reduxjs/toolkit';
import { AuthorizationStatus, SortOptions } from '../const';
import { City, Offers } from '../types/offers';
import {requireAuthorization, setActiveSort, setCity, setError, setOfferId, setOffers} from './actions';

const initialState: {
  isOffersDataLoading: boolean;city: City | null; offers: Offers; activeOfferId: number | null; activeSort: string; authorizationStatus: AuthorizationStatus; error: string | null;
} = {
  city: null,
  offers: [],
  activeOfferId: null,
  activeSort: SortOptions.Popular,
  authorizationStatus: AuthorizationStatus.NoAuth,
  error: null,
  isOffersDataLoading: false
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
