type User = {
  avatarUrl: string;
  name: string;
  isPro: boolean;
  id: number;
}

export type Review = {
  id: number;
  user: User;
  rating: number;
  date: string;
  comment: string;
}

export type Reviews = Review[];

