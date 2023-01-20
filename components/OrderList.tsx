import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getPublicUserData } from "../utils/fetchers";
import { getCookie } from "../utils/cookies";

import { Order, orders, user } from "../utils/types/types";

type item = {};
const OrderList = () => {
  const [userData, setUserData] = useState<user>();
  const userId = getCookie("userId");

  useEffect(() => {
    getPublicUserData(userId).then((response) => setUserData(response));
  }, []);

  console.log(userData);

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center gap-4">
      <div className="bg-zinc-800 rounded-md p-4 ring-2 ring-purple-600 flex flex-col gap-4">
        <h1 className="text-center text-3xl text-white">Meus Pedidos</h1>
        {userData?.orders.map((item: Order) =>
          item.pedidos.map((pedido: orders, index: number) => (
            <div
              key={index}
              className="flex rounded-md items-center w-full justify-between"
            >
              <img
                src={pedido.image}
                alt=""
                className="w-20 object-cover rounded-md h-18 shadow-black shadow-md ring-2 ring-violet-500 hover:scale-150 transition duration-300 ease-in hover:cursor-pointer h-20"
              />
              <div
                className="
              text-white px-4 w-full flex flex-col gap-2"
              >
                <p className="">
                  <span className="text-purple-500">Item:</span> {pedido.title}
                </p>
                <p className="">
                  <span className="text-purple-500">Preço:</span> {pedido.price}
                </p>
              </div>
              {pedido.delivered ? (
                <p className="bg-green-200 w-fit p-2">Entregue</p>
              ) : (
                <p className="bg-red-300 w-fit p-2 rounded-md">Preparação</p>
              )}
            </div>
          ))
        ) || <h1>Não há itens em seus pedidos! 😴</h1>}
      </div>
    </div>
  );
};

export default OrderList;
