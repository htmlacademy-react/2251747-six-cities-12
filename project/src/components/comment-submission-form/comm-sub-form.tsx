import React from 'react';
import { ChangeEvent, useState } from 'react';

function CommSubForm(): JSX.Element {
  const stars = [ 5, 4, 3, 2, 1];
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

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {stars.map((star) => (
          <React.Fragment key={star}>
            <input onChange={handleRatingChange} className="form__rating-input visually-hidden" name="rating" value={star} id={`${star}-stars`} type="radio"/>
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
        <button className="reviews__submit form__submit button" type="submit" disabled={false}>Submit</button>
      </div>
    </form>
  );
}
export default CommSubForm;
