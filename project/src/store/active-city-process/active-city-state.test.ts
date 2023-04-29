import { datatype } from 'faker';
import { SortOptions } from '../../const';
import {makeFakeOffer} from '../../mocks/mocks';
import { ActiveCityState } from '../../types/state';
import { fetchOffersAction, setFavoritesAction } from '../api-action';
import { activeCityState } from './active-city-state';

describe('Reducer: activeCityState', () => {
  let state: ActiveCityState;

  beforeEach(() => {
    state = {
      city: null,
      offers: [],
      isOffersDataLoading: false,
      activeOfferId: null,
      activeSort: SortOptions.Popular,
      hasError: false,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(
      activeCityState.reducer(void 0, {
        type: 'UNKNOWN_ACTION'
      })
    ).toEqual(state);
  });

  describe('Action: setCity', () => {
    it('should update the city', () => {
      const fakeCity = makeFakeOffer().city;
      expect(
        activeCityState.reducer(state, {
          type: activeCityState.actions.setCity.type,
          payload: fakeCity
        })
      ).toEqual({
        city: fakeCity,
        offers: [],
        isOffersDataLoading: false,
        activeOfferId: null,
        activeSort: SortOptions.Popular,
        hasError: false,
      });
    });
  });
  describe('Action: setOfferId', () => {
    it('should update the activeOfferId', () => {
      const fakeOfferId = makeFakeOffer().id;
      expect(
        activeCityState.reducer(state, {
          type: activeCityState.actions.setOfferId.type,
          payload: fakeOfferId
        })
      ).toEqual({
        city: null,
        offers: [],
        isOffersDataLoading: false,
        activeOfferId: fakeOfferId,
        activeSort: SortOptions.Popular,
        hasError: false,
      });
    });
  });
  describe('Action: setActiveSort', () => {
    it('should update the activeSort', () => {
      const fakeActiveSort = SortOptions.Popular;
      expect(
        activeCityState.reducer(state, {
          type: activeCityState.actions.setActiveSort.type,
          payload: fakeActiveSort
        })
      ).toEqual({
        city: null,
        offers: [],
        isOffersDataLoading: false,
        activeOfferId: null,
        activeSort: fakeActiveSort,
        hasError: false,
      });
    });
  });
  describe('Action: fetchOffersAction', () => {
    it('should update isOffersDataLoading to "true" if fetchOffersAction pending', () => {
      expect(
        activeCityState.reducer(state, {
          type: fetchOffersAction.pending.type
        })
      ).toEqual({
        city: null,
        offers: [],
        isOffersDataLoading: true,
        activeOfferId: null,
        activeSort: SortOptions.Popular,
        hasError: false,
      });
    });
    it('should update isOffersDataLoading to "false" if fetchOffersAction fulfilled', () => {
      expect(
        activeCityState.reducer(state, {
          type: fetchOffersAction.fulfilled.type,
          payload: []
        })
      ).toEqual({
        city: null,
        offers: [],
        isOffersDataLoading: false,
        activeOfferId: null,
        activeSort: SortOptions.Popular,
        hasError: false,
      });
    });
    it('should update isOffersDataLoading to "false" if fetchOffersAction rejected', () => {
      expect(
        activeCityState.reducer(state, {
          type: fetchOffersAction.rejected.type
        })
      ).toEqual({
        city: null,
        offers: [],
        isOffersDataLoading: false,
        activeOfferId: null,
        activeSort: SortOptions.Popular,
        hasError: true,
      });
    });
  });
  describe('Action: setFavoritesAction', () => {
    it('should update offers if setFavoritesAction fulfilled', () => {
      const fakeOffers = Array.from({length: datatype.number({min: 1, max: 10})}, () => makeFakeOffer());
      expect(
        activeCityState.reducer({...state, offers: fakeOffers}, {
          type: setFavoritesAction.fulfilled.type,
          payload: {...fakeOffers[0], isFavorite: !fakeOffers[0].isFavorite}
        })
      ).toEqual({
        city: null,
        offers: fakeOffers.map((offer) => offer.id === fakeOffers[0].id ? {...offer, isFavorite: !offer.isFavorite} : offer),
        isOffersDataLoading: false,
        activeOfferId: null,
        activeSort: SortOptions.Popular,
        hasError: false,
      });
    });
  });
});

