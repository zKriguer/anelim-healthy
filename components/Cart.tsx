import React, { useState } from "react";
import { orders } from "../utils/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "react-toastify";
import { getCookie } from "../utils/cookies";
import { deleteCartItem, finishBuyCart } from "../utils/fetchers";
import RenderIf from "./RenderIf";

type Props = {
  orders: orders[];
  saldo: number;
};

export const Cart = ({ orders, saldo }: Props) => {
  const [cartOpen, setCartOpen] = useState(false);

  const userId = getCookie("userId");

  let subTotalOrders: number[] = [];

  orders?.filter((item) => subTotalOrders.push(item.price));

  subTotalOrders = [
    subTotalOrders.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ),
  ];

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className={
              "fixed right-4 bottom-4 bg-zinc-900 text-white hover:text-black p-4 rounded-md transition hover:scale-110 duration-200 hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 cursor-pointer shadow-md shadow-black flex items-center justify-center"
            }
            onClick={() => {
              cartOpen ? setCartOpen(false) : setCartOpen(true);
            }}
          >
            <img src="/cart.png" alt="" className="h-8" />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className={"bg-red"} />
          <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] max-h-[85vh] py-6 px-14 flex flex-col gap-2 overflow-y-auto">
            <Dialog.Title className="text-2xl font-bold text-center">
              Deseja finalizar o pedido?
            </Dialog.Title>
            <Dialog.Description className="text-xl text-center">
              {orders?.length > 0 ? (
                <span>Você está comprando:</span>
              ) : (
                <div className="bg-zinc-300 w-full rounded-md p-4 h-20 flex flex-col items-center justify-center">
                  <h1>Não há itens no carrinho... 🥱</h1>
                </div>
              )}
            </Dialog.Description>
            <div className="flex flex-col gap-2">
              {orders?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex bg-slate-100 rounded-md items-center p-4 w-full justify-between"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-20 object-cover rounded-md h-18 shadow-black shadow-md ring-2 ring-violet-500 hover:scale-150 transition duration-300 ease-in hover:cursor-pointer"
                    />
                    <div className="flex flex-col p-2 w-full text-center">
                      <p>{item.title}</p>
                      <p className="text-purple-500">Preço: {item.price}</p>
                    </div>

                    <button
                      className="flex justify-end hover:ring-2 hover: ring-red-500 rounded-sm hover:shadow-md hover:shadow-black"
                      onClick={async () => {
                        await deleteCartItem(userId, item.id);
                        toast.success("Item Removido do carrinho! 😘");
                      }}
                    >
                      <p className="bg-red-400 rounded-sm p-2 h-fit">❌</p>
                    </button>
                  </div>
                );
              })}
            </div>

            <Dialog.Close>
              <button
                type="submit"
                className="fixed top-2 right-2 font-black font-mono"
              >
                <img src="/cancel-icon.png" className="w-5" alt="" />
              </button>

              <RenderIf condition={orders?.length > 0}>
                <button
                  onClick={() => {
                    if (saldo < subTotalOrders[0]) {
                      return toast.error(
                        "Seu saldo é insuficiente para esta compra 😫"
                      );
                    } else {
                      finishBuyCart(userId, orders);
                      toast.success("Pedido realizado com sucesso! 😀");
                    }
                  }}
                  className="hover:scale-110 duration-300 bg-purple-300 px-4 py-2 w-full rounded-md text-lg hover:bg-purple-500 cursor-pointer font-bold hover:text-white"
                >
                  Finalizar Pedido <br />
                  💸 {subTotalOrders}
                </button>
              </RenderIf>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
