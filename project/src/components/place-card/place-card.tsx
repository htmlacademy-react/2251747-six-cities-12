import { Link } from 'react-router-dom';
import { Offer } from '../../types/offers';
import BookmarkButton from '../bookmark-button/bookmark-button';

type PlaceCardProps = {
 offer: Offer;
 onMouseOverFn?: CallableFunction;
 prefixClass: string;
}

function PlaceCard ({offer, onMouseOverFn, prefixClass} : PlaceCardProps) : JSX.Element {

  const {isPremium, price, previewImage, rating, title, type} = offer;

  const onMouseOv = () => {
    if (onMouseOverFn) {
      onMouseOverFn(offer);
    }
  };

  return (
    <article onMouseOver={onMouseOv} className={`${prefixClass}__card place-card`}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${prefixClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={previewImage} width={`${prefixClass === 'favorites' ? '150' : '260'}`} height={`${prefixClass === 'favorites' ? '110' : '200'}`} alt="Place img"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton offer={offer} prefixClass={'place-card'}/>
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
