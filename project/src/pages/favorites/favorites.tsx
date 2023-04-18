import { useEffect, useState } from 'react';
import PlaceCard from '../../components/place-card/place-card';
import { Offers } from '../../types/offers';
import FavoriteEmptyScreen from './favorites-empty';

type FavoritesProps = {
  offers: Offers;
}

function Favorites({offers}: FavoritesProps): JSX.Element {
  const [favorites, setFavorites] = useState<Offers>([]);
  const [cities, setCities] = useState<string[]>([]);
  useEffect(() => {
    const favoriteArray = offers.filter((offer) => offer.isFavorite);
    setFavorites(favoriteArray);
    const citiesArray: string[] = [...new Set(favoriteArray.map((offer) => offer.city.name))];
    setCities(citiesArray);
  }, [offers]);
  return favorites.length === 0 ? <FavoriteEmptyScreen/> : (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="/#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favorites.filter((offer) => offer.city.name === city).map((offer) => (
                      <PlaceCard
                        offer={offer}
                        key={offer.id}
                        prefixClass="favorites"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}
export default Favorites;
