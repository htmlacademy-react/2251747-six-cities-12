import FirstScreen from '../../pages/first-screen/first-screen';
import {Route, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import Header from '../header/header';
import LoadingScreen from '../../pages/loading/loading';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import LoginItem from '../login/login-item';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector<AuthorizationStatus>((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector<boolean>((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Header />
      <Routes>
        <Route
          path={AppRoute.Login}
          element={<LoginItem />}
        />
        <Route
          path={AppRoute.Main}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FirstScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <Favorites
                offers={[]}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <Property offers={[]} reviews={[]}/>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;

