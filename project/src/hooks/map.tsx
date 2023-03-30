import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City,} from '../types/offers';

function useMap(mapRef: MutableRefObject<HTMLElement | null>,city: City | null): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderRef = useRef<boolean>(false);
  const defLat = 48.8589466;
  const defLong = 2.2769953;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city !== null ? city.location.latitude : defLat,
          lng: city !== null ? city.location.longitude : defLong,
        },
        zoom: city !== null ? city.location.zoom : 1,
      });
      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
