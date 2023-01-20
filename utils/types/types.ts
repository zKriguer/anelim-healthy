export type mealItem = {
  mealName: string | undefined;
  date: string;
  isHealthy: boolean;
};

export type user = {
  _id: string;
  name: string;
  meals: mealItem[];
  saldo: number;
  orders: Order[];
  isAdmin: boolean;
  cart: any[];
  boyFriendName: string;
};

export type orders = {
  userId: string;
  id: string;
  price: number;
  title: string;
  delivered: boolean;
  image: string;
};

export type cartItem = {
  userId: string;
  id: string;
  price: number;
  title: string;
  delivered: boolean;
  image: string;
};

export type Order = {
  idPedido: string;
  pedidos: orders[];
};
