import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/map';
import {City, Location,} from '../../types/offers';
import {URL_MARKER_DEFAULT} from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
 city: City;
 locations: Location[];
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


function Map({city, locations}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef,city,);

  useEffect(() => {
    if (map) {
      locations.forEach(({latitude: lat, longitude: lng}) => {
        const marker = new Marker({
          lat,
          lng
        });

        marker
          .setIcon(defaultCustomIcon)
          .addTo(map);

      });
    }

  }, [map, locations]);


  return (
    <section ref={mapRef} className="cities__map map"></section>
  );
}
export default Map;
