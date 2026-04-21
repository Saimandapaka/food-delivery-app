export interface Restaurant {
  id: number;
  name: string;
  cuisine: string[];
  rating: number;
  totalRatings: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  image: string;
  isVeg: boolean;
  address: string;
  isOpen: boolean;
  offer: string | null;
}