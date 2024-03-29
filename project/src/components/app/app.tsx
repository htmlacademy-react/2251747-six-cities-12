import FirstScreen from '../../pages/first-screen/first-screen';
import {Route, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoginItem from '../login/login-item';
import { getOffers } from '../../store/active-city-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector<AuthorizationStatus>((state) => state[NameSpace.User].authorizationStatus);
  const offers = useAppSelector(getOffers);

  return (

    <Routes>
      <Route
        path={AppRoute.Login}
        element={<LoginItem />}
      />
      <Route
        path={AppRoute.Main}
        element={
          <FirstScreen offers={offers}/>
        }
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute
            authorizationStatus={authorizationStatus}
          >
            <Favorites offers={offers}/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Room}
        element={
          <Property offers={offers}/>
        }
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;

