import React, { useState } from "react";
import { useQuery } from "react-query";
import { orders } from "../utils/types/types";
import { getCookie } from "../utils/cookies";
import { Cart } from "./Cart";

type ItemOnShop = {
  _id: string;
  title: string;
  image: string;
  price: number;
};

const ShopListUser = () => {
  const userId = getCookie("userId");

  let ordersToCart: any[] = [];

  const { data } = useQuery(
    ["products"],
    () => {
      return fetch("http://10.0.0.119:3000/products").then((response) =>
        response.json()
      );
    },
    {
      refetchOnWindowFocus: true,
      refetchInterval: 5000,
    }
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 w-full gap-12 relative">
        <Cart orders={ordersToCart} />
        {data?.map((item: ItemOnShop) => {
          return (
            <div
              key={item._id}
              className="bg-zinc-800 hover:bg-gray-700 hover:scale-110 transition duration-300 ease-in hover:ring-2 hover:ring-indigo-300 hover:cursor-pointer rounded-md col-span-1 h-full"
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
                <div className="flex flex-row justify-center">
                  <button
                    className="bg-purple-500 p-2 w-[35%] rounded-sm hover:bg-purple-100 hover:scale-110 transition duration-300 ease-in text-center"
                    onClick={(e) => {
                      e?.preventDefault;
                      ordersToCart.push({
                        userId: userId,
                        id: item._id,
                        price: item.price,
                        title: item.title,
                        delivered: false,
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
