import { SortOptions } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOfferId } from '../../store/actions';
import { getActiveSort } from '../../store/selectors';
import {Offer, Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlaceListProps = {
 offers: Offers;
 prefixClass: string;
}

function PlaceList ({offers, prefixClass} : PlaceListProps) : JSX.Element {
  let sorted = [...offers];
  const dispatch = useAppDispatch();
  const mouseOverHandler = (offer: Offer) => {
    dispatch(setOfferId(offer));
  };

  const activeSort = useAppSelector(getActiveSort);

  switch(activeSort) {
    case SortOptions.Popular:
      sorted = [...offers];
      break;
    case SortOptions.LowToHigh:
      sorted.sort((a,b) => a.price - b.price);
      break;
    case SortOptions.HighToLow:
      sorted.sort((a,b) => b.price - a.price);
      break;
    case SortOptions.TopRated:
      sorted.sort((a,b) => a.rating - b.rating);
      break;
    default:
  }

  return (
    <div className={`${prefixClass === 'near-places' ? 'near-places__list' : 'cities__places-list' } places__list${prefixClass === 'near-places' ? '' : ' tabs__content'}`}>
      {sorted.map((offer) => (
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
