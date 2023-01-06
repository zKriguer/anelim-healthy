import { mealItem } from "./types/types";

export async function getPrivateData(email: string, password: string) {
  const data = await fetch(
    `http://localhost:3000/user-profile/${email}/${password}`
  );

  return data;
}

export async function getPublicUserData(userId: string) {
  const data = await fetch(`http://localhost:3000/user-profile/${userId}/`);

  if (data.ok) return data.json();
}

export async function instertMeals(userId: string, meal: mealItem) {
  if (!userId || !userId || !meal) return;
  await fetch(`http://localhost:3000/user-profile/meals/${userId}/`, {
    method: "PUT",
    body: JSON.stringify(meal),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export async function insertProduct(product: any) {
  if (!product) return;
  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
}

export async function getAllProductsOnShop() {
  return fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      // faça alguma coisa com os dados aqui
      return data;
    });
}
