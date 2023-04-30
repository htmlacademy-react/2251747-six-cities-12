
import {
  address,
  commerce,
  datatype,
  internet,
  date
} from 'faker';
import { UserData } from '../types/user';
import { Location, Host, Offer, City, Offers} from '../types/offers';
import { Review, User , Reviews} from '../types/reviews';


export const makeFakeUserData = (): UserData => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  email: internet.email(),
  token: internet.password(),
  isPro: datatype.boolean(),
  name: internet.userName(),
});

export const makeFakeLocation = (): Location => ({
  latitude: datatype.number(),
  longitude: datatype.number(),
  zoom: datatype.number(),
});

export const makeFakeHost = (): Host => ({
  avatarUrl: internet.avatar(),
  name: internet.userName(),
  isPro: datatype.boolean(),
  id: datatype.number(),
});

export const makeFakeCity = (): City =>({
  name: address.city(),
  location: makeFakeLocation(),
});

export const makeFakeOffer = (): Offer => ({
  city: makeFakeCity(),
  images: Array.from({length: datatype.number({min: 1, max: 10})}, () => internet.avatar()),
  title: internet.userName(),
  type: commerce.product(),
  previewImage: internet.avatar(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number({min: 0, max: 5, precision: 0.1}),
  bedrooms: datatype.number({min: 1, max: 10}),
  maxAdults: datatype.number({min: 1, max: 5}),
  price: datatype.number(),
  goods:[commerce.product(), commerce.product(), commerce.product()],
  host: makeFakeHost(),
  description: commerce.productDescription(),
  location: makeFakeLocation(),
  id: datatype.number(),
});
export const makeFakeOffers = (): Offers => Array.from({ length: 10 }, makeFakeOffer);
export const makeFakeNearbyOffers = (): Offers => Array.from({ length: 3 }, makeFakeOffer);

export const makeFakeUser = (): User=> ({
  avatarUrl: internet.avatar(),
  name: internet.userName(),
  isPro: datatype.boolean(),
  id: datatype.number(),
});

export const makeFakeReview = (): Review => ({
  id: datatype.number(),
  user: makeFakeUser(),
  rating: datatype.number({min: 0, max: 5, precision: 0.1}),
  date: String(date.recent()),
  comment: commerce.productDescription(),
});

export const makeFakeReviews = (): Reviews => Array.from({ length: 5 }, makeFakeReview);
