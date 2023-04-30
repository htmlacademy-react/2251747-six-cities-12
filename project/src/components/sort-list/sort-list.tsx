import { useState } from 'react';
import { SortOptions } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { activeCityState } from '../../store/active-city-process/active-city-state';
import { getActiveSort } from '../../store/active-city-process/selectors';

function SortList(): JSX.Element {
  const [isSortingOpen, setSortingOpen,] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const selectSort = (sort: string) => {
    dispatch(activeCityState.actions.setActiveSort(sort));
  };

  const activeSort = useAppSelector(getActiveSort);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setSortingOpen(!isSortingOpen)}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom places__options${isSortingOpen ? '--opened' : ''}`}>
        { Object.values(SortOptions).map( (sort) => (
          <li key={sort} className={`places__option places__option${activeSort === sort ? '--active' : ''}`} tabIndex={0} onClick={() =>
          {
            selectSort(sort);
            setSortingOpen(false);
          }}
          >{sort}
          </li>
        ))}
      </ul>
    </form>
  );
}
export default SortList;
