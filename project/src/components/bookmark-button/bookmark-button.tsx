import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFavoritesAction } from '../../store/api-action';
import { getAuthStatus } from '../../store/user-process/selectors';
import { Offer } from '../../types/offers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type BookmarkButtonProps = {
  offer: Offer;
  prefixClass: string;
}
function BookmarkButton ({offer, prefixClass}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (isAuth === AuthorizationStatus.Auth) {
      dispatch(setFavoritesAction({
        id: offer.id,
        status: Number(!offer.isFavorite)
      }));
    } else {
      toast('You need to login to save favorites');
      navigate(AppRoute.Login);
    }
  };

  return (
    <button className={`${prefixClass}__bookmark-button ${offer.isFavorite ? `${prefixClass}__bookmark-button--active` : ''} button`} type="button" onClick={handleButtonClick}>
      <svg className={`${prefixClass}__bookmark-icon`} width={prefixClass === 'place-card' ? '18' : '31'} height={prefixClass === 'place-card' ? '19' : '33'}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
export default BookmarkButton;
