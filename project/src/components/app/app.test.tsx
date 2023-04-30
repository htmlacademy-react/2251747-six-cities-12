import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute, AppRoute, AuthorizationStatus, NameSpace, SortOptions } from '../../const';
import { makeFakeNearbyOffers, makeFakeOffers, makeFakeReviews, makeFakeUserData } from '../../mocks/mocks';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { generatePath } from 'react-router';
import { createAPI } from '../../services/api';
import { StatusCodes } from 'http-status-codes';
import MockAdapter from 'axios-mock-adapter';
import { datatype } from 'faker';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const mockStore = configureMockStore();
const fakeOffers = makeFakeOffers();
const fakeOffer = fakeOffers[Number(datatype.number(fakeOffers.length - 1))];
const fakeUserData = makeFakeUserData();
const fakeReviews = makeFakeReviews();
const fakeNearByOffers = makeFakeNearbyOffers();

const store = mockStore({
  [NameSpace.ActiveCity]:{
    city: fakeOffer.city,
    offers: fakeOffers,
    activeOfferId: fakeOffer.id,
    activeSort: SortOptions.Popular,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "LoginPage" when user navigate to "/login"', () => {
    const state = store.getState();

    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: fakeUserData,
    };

    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByTestId('loginPage')).toBeInTheDocument();
  });

  it('should render "MainPage" when user navigate to "/" route', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    const state = store.getState();
    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
    };

    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByTestId('favoritesPage')).toBeInTheDocument();
  });

  it('should render "PropertyPage" when user navigate to "/offer"', () => {
    history.push(generatePath(AppRoute.Room, { id: `${fakeOffer.id}` }));
    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeOffer.id}`)
      .reply(StatusCodes.OK, fakeReviews);

    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOffer.id}/nearby`)
      .reply(StatusCodes.OK, fakeNearByOffers);

    render(fakeApp);

    expect(screen.getByTestId('propertyPage')).toBeInTheDocument();

  });

  it('should render "Not Found Screen" when user navigate to "*" route', () => {
    history.push('/non-existent_address');

    render(fakeApp);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
  });

});
