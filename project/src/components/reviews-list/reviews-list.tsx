
import { useEffect, useState } from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-process/selectors';
import {Review, Reviews} from '../../types/reviews';
import CommentSubmissionForm from '../comment-submission-form/comm-sub-form';
import ReviewItem from '../review-item/review-item';


type ReviewsListProps = {
 reviews: Reviews;
 hotelId: number;
}

function ReviewsList ({ reviews, hotelId} : ReviewsListProps) : JSX.Element {
  const [reviewList, setReviewList] = useState<Reviews>([]);
  const authStatus = useAppSelector(getAuthStatus);

  const setNewReviews = (newReviews: Reviews) => {
    setReviewList(newReviews);
  };

  useEffect(() => {
    setReviewList(reviews);
  }, [reviews]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewList.length}</span></h2>
      <ul className="reviews__list">
        {reviewList.map((review: Review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))}
      </ul>
      {authStatus === AuthorizationStatus.Auth &&
        <CommentSubmissionForm
          hotelId={hotelId}
          newReviewsCB={setNewReviews}
        />}
    </section>
  );
}
export default ReviewsList;

