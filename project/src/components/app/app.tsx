import FirstScreen from '../../pages/first-screen/first-screen';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import Header from '../header/header';
import LoadingScreen from '../../pages/loading/loading';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector<AuthorizationStatus>((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector<boolean>((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<FirstScreen />}
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
          element={<Property offers={[]} reviews={[]}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

