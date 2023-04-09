import {useRef, useEffect} from 'react';
import {Icon, LatLng, Marker} from 'leaflet';
import useMap from '../../hooks/map';
import {City, Offer, Offers,} from '../../types/offers';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';
import 'leaflet/dist/leaflet.css';
import { getOfferId } from '../../store/selectors';
import { useAppSelector } from '../../hooks';

type MapProps = {
 city: City | null;
 offers: Offers;
 isProperty?: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT
});


function Map({city, offers, isProperty}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef,city,);

  const offerIdState = useAppSelector(getOfferId);

  useEffect(() => {
    if (map) {
      offers.forEach((of: Offer, index) => {
        const marker = new Marker({
          lat: of.location.latitude,
          lng: of.location.longitude,
        });

        let icon;
        if (isProperty) {
          icon = index === 0 ? currentCustomIcon : defaultCustomIcon;
        } else {
          icon = of.id === offerIdState ? currentCustomIcon : defaultCustomIcon;
        }

        marker
          .setIcon(icon)
          .addTo(map);

      });

      if (city) {
        map.flyTo(new LatLng(city.location.latitude, city.location.longitude), city.location.zoom);
      }
    }

  }, [map, offers, city, offerIdState]);


  return (
    <section ref={mapRef} className={`${isProperty ? 'property__map' : 'cities__map'} map`}></section>
  );
}
export default Map;
