export type mealItem = {
  mealName: string | undefined;
  date: string;
  isHealth: boolean;
};

export type user = {
  isAdmin: boolean;
  meals: mealItem[];
  name: string;
  orders: any;
  saldo: number;
};

export type orders = {
  userId: string;
  id: string;
  price: number;
  title: string;
  delivered: boolean;
};
