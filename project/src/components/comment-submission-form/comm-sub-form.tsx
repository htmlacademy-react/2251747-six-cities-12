import React from 'react';
import { ChangeEvent, useState } from 'react';
import { APIRoute } from '../../const';
import { api } from '../../store';
import { Review } from '../../types/reviews';

type CommentSubmissionFormProps = {
  hotelId: number;
  newReviewsCB : CallableFunction;
}

function CommentSubmissionForm({hotelId, newReviewsCB} : CommentSubmissionFormProps): JSX.Element {
  const stars = new Array(5).fill(5).map((item, index) => item - index);
  const MIN_COMMENTS_LENGTH = 50;
  const MAX_COMMENTS_LENGTH = 300;
  const initialState = {
    rating: 0,
    comment: '',
  };
  const [formData, setFormData] = useState(initialState);

  const handleCommentChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      comment: target.value
    });
  };

  const handleRatingChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rating: Number(target.value)
    });
  };

  const handleSubmit = () => {
    api.post<Review>(`${APIRoute.Comments}/${hotelId}`, {rating: formData.rating, comment: formData.comment}).then((resp) => {
      newReviewsCB(resp.data);
      setFormData(initialState);
    });

  };

  const isButtonDisabled =
     formData.rating === 0 ||
     (formData.comment.length < MIN_COMMENTS_LENGTH || formData.comment.length > MAX_COMMENTS_LENGTH);

  return (
    <form className="reviews__form form" onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {stars.map((star) => (
          <React.Fragment key={star}>
            <input onChange={handleRatingChange} className="form__rating-input visually-hidden" name="rating" value={star | 0} id={`${star}-stars`} type="radio" checked={star === formData.rating}/>
            <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea onChange={handleCommentChange} value={formData.comment} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled}>Submit</button>
      </div>
    </form>
  );
}
export default CommentSubmissionForm;
