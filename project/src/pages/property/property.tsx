import { useParams } from 'react-router';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PlaceList from '../../components/place-list/place-list';
import { api } from '../../store';
import { APIRoute } from '../../const';
import { useEffect, useState } from 'react';

type PropertyProps = {
  offers: Offers;
}

function Property({offers}: PropertyProps): JSX.Element {
  const [nearbyOffers, setNearbyOffers] = useState<Offers>([]);
  const [reviews, setReviews] = useState<Reviews>([]);
  const maxCountImg = 6;
  const { id } = useParams();

  const offer = offers.find((of) => of.id === Number(id));
  useEffect(() => {
    if (id) {
      api.get<Reviews>(`${APIRoute.Comments}/${id}`).then((resp) => {
        setReviews(resp.data);
      });
      api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`).then((resp) => {
        setNearbyOffers(resp.data);
      });
    }
  }, [id]);


  if (!offer) {
    return NotFoundScreen();
  }
  const {images, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description, city} = offer;
  const maximages = images?.slice(0, maxCountImg);

  return (
    <div className="page">
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {maximages?.map((img) => (
                <div key={img} className="property__image-wrapper">
                  <img className="property__image" src={img} alt="Phot studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer?.title }
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width:`${rating ? (rating / 5 * 100) : 0}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">4.8</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods?.map((good) => (
                    <li key={good} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host?.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host?.name}
                  </span>
                  <span className="property__user-status">
                    {host?.isPro}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <ReviewsList reviews={reviews} hotelId={Number(id)}/>
            </div>
          </div>
          <Map
            isProperty
            city={city}
            offers={[offer, ...nearbyOffers]}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlaceList offers={nearbyOffers}
              prefixClass="near-places"
            />
          </section>
        </div>
      </main>
    </div>
  );
}
export default Property;
