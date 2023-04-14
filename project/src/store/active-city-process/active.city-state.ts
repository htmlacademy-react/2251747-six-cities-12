import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, SortOptions} from '../../const';
import { City } from '../../types/offers';
import {ActiveCityState} from '../../types/state';
import { fetchOffersAction } from '../api-action';

const initialState: ActiveCityState = {
  city: null,
  offers: [],
  activeOfferId: null,
  isOffersDataLoading: false,
  activeSort: SortOptions.Popular,
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
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      });
  }
});
