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
