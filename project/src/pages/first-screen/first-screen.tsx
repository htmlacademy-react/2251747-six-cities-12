import PlaceList from '../../components/place-list/place-list';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import SortList from '../../components/sort-list/sort-list';
import { Offers } from '../../types/offers';
import { getCity } from '../../store/active-city-process/selectors';
import { activeCityState } from '../../store/active-city-process/active.city-state';
import LoadingScreen from '../loading/loading';
import { NameSpace } from '../../const';
import { getErrorStatus } from '../../store/user-process/selectors';
import MainEmpty from '../../components/main-empty/main-empty';

type FirstScreenProps = {
  offers: Offers;
}

function FirstScreen({offers}: FirstScreenProps): JSX.Element {
  const isOffersDataLoading = useAppSelector<boolean>((state) => state[NameSpace.ActiveCity].isOffersDataLoading);
  const cityState = useAppSelector(getCity);
  const [cityOffers, setCityOffers] = useState<Offers>([]);
  const hasError = useAppSelector(getErrorStatus);

  const dispatch = useAppDispatch();
  const cities = offers.map((offer) => offer.city);
  const cityNames = [...new Set(cities.map((c) => c.name))];
  const defCity = 'Paris';

  const chooseCity = (name: string) => {
    const city = cities.find((c) => c.name === name);
    if (city) {
      dispatch(activeCityState.actions.setCity(city));
      setCityOffers(offers.filter((o) => o.city.name === name));
    }
  };

  const locationItemActive = cityNames.map((name,index) => (
    <li key={`${name}-${index.toString()}`} className="locations__item">
      <a className={`locations__item-link tabs__item tabs__item${cityState?.name === name ? '--active' : ''}`}
        onClick={(e) => {e.preventDefault(); chooseCity(name);}}
        href="/#"
      >
        <span>{name}</span>
      </a>
    </li>
  ));

  const setInitialCity = () => {
    if (cities.length > 0) {
      if (cities.find((c) => c.name === defCity)) {
        chooseCity(defCity);
      } else {
        chooseCity(cities[0].name);
      }
    }
  };

  useEffect(() => {
    setInitialCity();
  }, [offers]);

  if (hasError || offers.length === 0) {
    return <MainEmpty />;
  }

  return isOffersDataLoading ? <LoadingScreen /> : (
    <div className="page page--gray page--main">

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {locationItemActive}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              {cityState && <b className="places__found">{cityOffers.length} places to stay in {cityState?.name}</b>}
              <SortList/>
              <PlaceList
                offers={cityOffers}
                prefixClass="cities"
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={cityState}
                offers={cityOffers}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FirstScreen;
