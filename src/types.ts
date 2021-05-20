export interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export type FoodInput = Omit<Food, 'id'>