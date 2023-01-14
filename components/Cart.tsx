import React from "react";
import { orders } from "../utils/types/types";

type Props = {
  orders: orders[];
};

export const Cart = ({ orders }: Props) => {
  return (
    <div className="fixed right-4 bottom-4 bg-zinc-900 text-white hover:text-black p-4 rounded-md transition hover:scale-110 duration-200 hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 cursor-pointer shadow-md shadow-black flex items-center justify-center">
      <img src="/cart.png" alt="" className="h-8 mr-1" />
    </div>
  );
};
