import { cartItem, mealItem } from "./types/types";

export async function getPrivateData(email: string, password: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-profile/${email}/${password}`
  );

  return data;
}

export async function getPublicUserData(userId: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-profile/${userId}/`
  );

  return data.json();
}

export async function instertMeals(userId: string, meal: mealItem) {
  if (!userId || !meal) return;
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-profile/meals/${userId}/`,
    {
      method: "PUT",
      body: JSON.stringify(meal),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
}

export async function instertCartItem(userId: string, cartItem: cartItem) {
  if (!userId || !cartItem) return;
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-profile/cart/${userId}/`,
    {
      method: "PUT",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
}

export async function insertProduct(product: any) {
  if (!product) return;
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
}

export async function deleteProduct(productId: string) {
  if (!productId) return;
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
    method: "delete",
  }).then((response) => response.json());
}

export async function deleteCartItem(userId: string, cartItemId: string) {
  if (!cartItemId || !userId) return;
  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-profile/cart/${userId}/${cartItemId}`,
    {
      method: "delete",
    }
  ).then((response) => response.json());
}

export async function finishBuyCart(userId: string, cartItems: cartItem[]) {
  if (!userId || !cartItems) return;
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user-profile/cart/finish/${userId}/`,
    {
      method: "PUT",
      body: JSON.stringify(cartItems),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
