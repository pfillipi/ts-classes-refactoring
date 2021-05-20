import { useRef } from 'react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from "../services/api";
import { Food, FoodInput } from "../types";

interface FoodsProviderProps {
  children: ReactNode;
}

interface FoodsContextData {
  foods: Food[];
  createFood: (food: FoodInput) => Promise<void>;
  deleteFood: (id: number) => Promise<void>;
  editFood: (food: Food) => Promise<void>;
  changeAvailability: (food: Food) => Promise<void>;
}

export const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData)

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  async function getFoods() {
    setFoods([])
    const { data } = await api.get('/foods');
    setFoods(data);
  }
  useEffect(() => {
    getFoods();
  }, []);
  async function createFood(foodInput: FoodInput) {
    const response = await api.post('/foods', {
      ...foodInput,
      available: true,
    });
    if (response) {
      getFoods();
    }
  }
  async function editFood(food: Food) {
    await api.put(`/foods/${food?.id}`, food);
    getFoods();
  }
  async function deleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    getFoods();
  }
  async function changeAvailability(food: Food) {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !food.available,
    });
  }
  return (
    <FoodsContext.Provider value={{ foods, createFood, deleteFood, editFood, changeAvailability }}>
      {children}
    </FoodsContext.Provider>)
}
export function useFoods(): FoodsContextData {
  const context = useContext(FoodsContext);
  return context;
}