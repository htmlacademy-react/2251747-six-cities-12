import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';

type PlaceCardProps = {
 offer: Offer;
 isFavoriteCard?: boolean;
 onMouseOverFn?: CallableFunction;
}

function PlaceCard ({offer, isFavoriteCard, onMouseOverFn} : PlaceCardProps) : JSX.Element {

  const {isPremium, price, previewImage, rating, title, type} = offer;

  const onMouseOv = () => {
    if (onMouseOverFn) {
      onMouseOverFn(offer);
    }
  };

  return (
    <article onMouseOver={onMouseOv} className={`${isFavoriteCard ? 'favorites__card' : 'cities__card'} place-card`}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${isFavoriteCard ? 'favorites' : 'cities'}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={previewImage} width={`${isFavoriteCard ? '150' : '260'}`} height={`${isFavoriteCard ? '110' : '200'}`} alt="Place img"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title }</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
export default PlaceCard;
