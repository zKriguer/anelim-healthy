import React, { useState } from "react";
import { useQuery } from "react-query";
import { cartItem, orders } from "../utils/types/types";
import { getCookie } from "../utils/cookies";
import { Cart } from "./Cart";
import { toast } from "react-toastify";
import { getPublicUserData, instertCartItem } from "../utils/fetchers";

type ItemOnShop = {
  _id: string;
  title: string;
  image: string;
  price: number;
};

const ShopListUser = () => {
  const userId = getCookie("userId");

  async function handleBuyToCart(order: orders) {
    if (CartItems?.cart?.find((item: cartItem) => item.title == order.title))
      return toast.error("Coloca só um, ja existe um desse no carrinho");

    instertCartItem(userId, order);

    toast.success("Adicionado ao carrinho, vc quer mesmo falir o krig?");
  }

  const { data: ProductItems } = useQuery(
    ["products"],
    () => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`).then(
        (response) => response.json()
      );
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
    }
  );

  const { data: CartItems } = useQuery(
    ["cartItems"],
    () => {
      return getPublicUserData(userId).then((response) => response);
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 3000,
    }
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 w-full gap-12 relative top-7">
        <Cart orders={CartItems?.cart} saldo={CartItems?.saldo} />
        {ProductItems?.map((item: ItemOnShop) => {
          return (
            <div
              key={item._id}
              className="bg-zinc-800 hover:bg-gray-700 hover:scale-110 transition duration-300 ease-in hover:ring-2 hover:ring-purple-600 hover:shadow-2xl hover:shadow-purple-600 hover:cursor-pointer rounded-md col-span-1 flex flex-col justify-around"
            >
              <img
                className="w-full object-cover rounded-md h-48"
                src={item.image}
                alt=""
              />

              <div className="text-sm p-2 flex flex-col gap-4">
                <h2 className="text-white">
                  Produto: <span className="text-indigo-300">{item.title}</span>
                </h2>
                <p className="text-white">
                  Preço: <span className="text-indigo-300">{item.price}</span>
                </p>
                <div className="flex flex-row self-center">
                  <button
                    className="bg-purple-500 p-2 w-full rounded-sm hover:bg-purple-100 hover:scale-110 transition duration-300 ease-in text-center "
                    onClick={(e) => {
                      e?.preventDefault;
                      handleBuyToCart({
                        userId: userId,
                        id: item._id,
                        price: item.price,
                        title: item.title,
                        delivered: false,
                        image: item.image,
                      });
                    }}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopListUser;
