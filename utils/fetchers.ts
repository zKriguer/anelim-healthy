import { mealItem } from "./types/types";

export async function getPrivateData(email: string, password: string) {
  const data = await fetch(
    `http://10.0.0.119:3000/user-profile/${email}/${password}`
  );

  return data;
}

export async function getPublicUserData(userId: string) {
  const data = await fetch(`http://10.0.0.119:3000/user-profile/${userId}/`);

  if (data.ok) return data.json();
}

export async function instertMeals(userId: string, meal: mealItem) {
  if (!userId || !userId || !meal) return;
  await fetch(`http://10.0.0.119:3000/user-profile/meals/${userId}/`, {
    method: "PUT",
    body: JSON.stringify(meal),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export async function insertProduct(product: any) {
  if (!product) return;
  fetch("http://10.0.0.119:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
}

export async function deleteProduct(productId: string) {
  if (!productId) return;
  fetch(`http://10.0.0.119:3000/products/${productId}`, {
    method: "delete",
  }).then((response) => response.json());
}
