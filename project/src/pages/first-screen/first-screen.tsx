import PlaceList from '../../components/place-list/place-list';
import { Offers } from '../../types/offers';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity, setOffers } from '../../store/actions';
import { getCity, getOffers } from '../../store/selectors';
import { useEffect } from 'react';

type FirstScreenProps = {
  offers: Offers;
}
function FirstScreen ({offers}: FirstScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const cities = offers.map((offer) => offer.city);
  const cityNames = [...new Set(cities.map((c) => c.name))];

  const chooseCity = (name: string) => {
    const city = cities.find((c) => c.name === name);
    if (city) {
      dispatch(setCity(city));
      const cityOffers = offers.filter((o) => o.city.name === name);
      dispatch(setOffers(cityOffers));
    }
  };

  const setInitialCity = () => {
    if (cities.length > 0) {
      if (cities.find((c) => c.name === 'Paris')) {
        chooseCity('Paris');
      } else {
        chooseCity(cities[0].name);
      }
    }
  };

  useEffect(() => {
    setInitialCity();
  }, [offers]);

  const cityState = useAppSelector(getCity);
  const offersState = useAppSelector(getOffers);

  return (
    <div className="page page--gray page--main">

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cityNames.map((name,index) => (
                <li key={`${name}-${index.toString()}`} className="locations__item">
                  <a href="/#" className={`locations__item-link tabs__item tabs__item${cityState?.name === name ? '--active' : ''}`} onClick={(e) => {e.preventDefault(); chooseCity(name);}}>
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              {cityState && <b className="places__found">{offersState.length} places to stay in {cityState?.name}</b>}
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlaceList
                offers={offersState}
                prefixClass="cities"
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={cityState}
                locations={offersState.map((offer) => offer.location)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FirstScreen;
