
import {Review} from '../../types/reviews';
import CommSubForm from '../comment-submission-form/comm-sub-form';
import ReviewItem from '../review-item/review-item';


type ReviewsListProps = {
 reviews: Review[];
}

function ReviewsList ({ reviews} : ReviewsListProps) : JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))}
      </ul>
      <CommSubForm/>
    </section>
  );
}
export default ReviewsList;

