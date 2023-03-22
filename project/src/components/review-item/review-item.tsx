import dayjs from 'dayjs';
import { Review } from '../../types/reviews';

type ReviewItemProps = {
  review: Review;
 }

function ReviewItem ({review} : ReviewItemProps) : JSX.Element {
  const {user, comment, rating, date} = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt={user.name}/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{`${dayjs(date).format('MMMM YYYY')}`}</time>
      </div>
    </li>
  );
}
export default ReviewItem;
