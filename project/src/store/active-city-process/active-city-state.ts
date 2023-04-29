import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, SortOptions} from '../../const';
import { City } from '../../types/offers';
import {ActiveCityState} from '../../types/state';
import { fetchOffersAction, setFavoritesAction } from '../api-action';

const initialState: ActiveCityState = {
  city: null,
  offers: [],
  activeOfferId: null,
  isOffersDataLoading: false,
  activeSort: SortOptions.Popular,
  hasError: false,
};

export const activeCityState = createSlice({
  name: NameSpace.ActiveCity,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOfferId: (state, action: PayloadAction<number>) => {
      state.activeOfferId = action.payload;
    },
    setActiveSort:(state, action: PayloadAction<string>) => {
      state.activeSort = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(setFavoritesAction.fulfilled, (state, action) => {
        const offers = state.offers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          } else {
            return offer;
          }
        });
        state.offers = offers;
      });
  }
});
