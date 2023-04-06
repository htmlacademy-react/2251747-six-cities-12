import {createReducer} from '@reduxjs/toolkit';
import { AuthorizationStatus, SortOptions } from '../const';
import { City, Offers } from '../types/offers';
import { UserData } from '../types/user';
import {requireAuthorization, setActiveSort, setCity, setOfferId, setOffers, setUser} from './actions';

const initialState: {
  isOffersDataLoading: boolean;city: City | null; offers: Offers; activeOfferId: number | null; activeSort: string; authorizationStatus: AuthorizationStatus; user: UserData | null;
} = {
  city: null,
  offers: [],
  activeOfferId: null,
  activeSort: SortOptions.Popular,
  authorizationStatus: AuthorizationStatus.NoAuth,
  isOffersDataLoading: false,
  user: null,
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
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
