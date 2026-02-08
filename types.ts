
export interface DonationPackage {
  id: string;
  price: number;
  childrenFed: number;
  title: string;
  description: string;
  tag?: string;
  benefits: string[];
  color: string;
}

export interface ImpactStory {
  userName: string;
  packageName: string;
  content: string;
}

export interface UserReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
}
