import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffers } from '../../store/active-city-process/selectors';
import { logoutAction } from '../../store/api-action';
import { getAuthStatus, getUser } from '../../store/user-process/selectors';
import { UserData } from '../../types/user';

function Header(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const dispatch = useAppDispatch();
  const user: UserData | null = useAppSelector(getUser);
  const authState = useAppSelector(getAuthStatus);

  return (
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          {authState === AuthorizationStatus.Auth &&
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  <img src={user?.avatarUrl} alt="Avatar"></img>
                </div>
                <span className="header__user-name user__name">{user?.email}</span>
                <span className="header__favorite-count">{offers.filter((offer) => offer.isFavorite ).length}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="/#" onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              >
                <span className="header__signout">Sign out
                </span>
              </a>
            </li>
          </ul> }
        </nav>
      </div>
    </div>
  );
}
export default Header;
