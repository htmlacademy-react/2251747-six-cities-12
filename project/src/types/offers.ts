type Host = {
  avatarUrl: string;
  name: string;
  isPro: boolean;
  id: number;
}

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type City = {
  name: string;
  location: Location;
}

export type Offer = {
  city: City;
  images: string[];
  title: string;
  type: string;
  previewImage: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: Location;
  id: number;
}

export type Offers = Offer[];
