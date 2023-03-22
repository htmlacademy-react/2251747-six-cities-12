//import { useState } from 'react';
import {Offer, Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlaceListProps = {
 offers: Offers;
 prefixClass: string;
}

function PlaceList ({offers, prefixClass} : PlaceListProps) : JSX.Element {
  //const [activeOffer, setActiveOffer] = useState<Offer>();
  const mouseOverHandler = (offer: Offer) => {
    //setActiveOffer(offer);
  };

  return (
    <div className={`${prefixClass === 'near-places' ? 'near-places__list' : 'cities__places-list' } places__list${prefixClass === 'near-places' ? '' : ' tabs__content'}`}>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onMouseOverFn={mouseOverHandler}
          prefixClass={prefixClass}
        />
      ))}
    </div>
  );
}
export default PlaceList;
