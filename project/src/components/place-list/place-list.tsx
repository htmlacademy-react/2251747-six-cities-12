//import { useState } from 'react';
import {Offer, Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlaceListProps = {
 offers: Offers;
}

function PlaceList ({offers} : PlaceListProps) : JSX.Element {
  //const [activeOffer, setActiveOffer] = useState<Offer>();
  const mouseOverHandler = (offer: Offer) => {
    //setActiveOffer(offer);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          onMouseOverFn={mouseOverHandler}
        />
      ))}
    </div>
  );
}
export default PlaceList;
