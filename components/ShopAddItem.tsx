import React, { useRef } from "react";
import { insertProduct } from "../utils/fetchers";
import * as Dialog from "@radix-ui/react-dialog";

const ShopAddItem = () => {
  const productNameRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);

  const productImageRef = useRef<HTMLInputElement>(null);
  const button: React.ReactNode = (
    <button
      onClick={async () => {}}
      className="rounded-md shadow-lg shadow-black w-1/2 md:w-1/4 transition hover:scale-110 duration-200 ease-linear"
    >
      <p
        className={`bg-zinc-600 w-full text-white hover:text-black px-4 py-2 rounded-md hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 transition hover:scale-110 duration-200 md:text-xl `}
      >
        Adicionar +
      </p>
    </button>
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (
      !productNameRef.current?.value ||
      !productImageRef.current?.value ||
      !productPriceRef.current?.value
    )
      return alert("COLOCA ALGO");

    console.log({
      title: productNameRef.current?.value,
      price: productPriceRef.current?.value,
      image: productImageRef.current?.value,
    });

    await insertProduct({
      title: productNameRef.current?.value,
      price: productPriceRef.current?.value,
      image: productImageRef.current?.value,
    });
  }

  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col items-center">
      <Dialog.Root open={open}>
        <Dialog.Trigger asChild>
          <button
            onClick={() => setOpen(true)}
            className="rounded-md shadow-lg shadow-black w-1/2 md:w-1/4 transition hover:scale-110 duration-200 ease-linear"
          >
            <p
              className={`bg-zinc-600 w-full text-white hover:text-black px-4 py-2 rounded-md hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 transition hover:scale-110 duration-200 md:text-xl `}
            >
              Adicionar +
            </p>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[85vh] py-6 px-14 flex flex-col gap-2">
            <Dialog.Title className="text-lg font-bold text-center">
              Adicionar Itens a loja
            </Dialog.Title>
            <Dialog.Description></Dialog.Description>
            <form
              onSubmit={(event) => {
                setOpen(false);
                handleSubmit(event);
              }}
              className="flex flex-col gap-4 items-center w-full"
            >
              <fieldset className="border-[1px] border-violet-500 rounded-sm pb-2 w-full">
                <legend className="mx-2 px-2"> Nome do produto </legend>
                <input
                  className="outline-none w-full p-4 text-base h-2"
                  type="text"
                  name="productName"
                  placeholder="Título do produto 🏳‍🌈"
                  ref={productNameRef}
                />
              </fieldset>

              <fieldset className="border-[1px] border-violet-500 rounded-sm pb-2 w-full">
                <legend className="mx-2 px-2"> Preço </legend>
                <input
                  className="outline-none w-full p-4 text-base h-2"
                  type="number"
                  name="productPrice"
                  placeholder="Preço 🤑"
                  min={0}
                  ref={productPriceRef}
                />
              </fieldset>

              <fieldset className="border-[1px] border-violet-500 rounded-sm pb-2 w-full">
                <legend className="mx-2 px-2"> Imagem </legend>
                <input
                  className="outline-none w-full p-4 text-base h-2"
                  type="text"
                  name="productImageLink"
                  placeholder="Coloca o link da imagem direto ae 📸"
                  ref={productImageRef}
                />
              </fieldset>

              <input
                type="submit"
                value="Adicionar"
                className="hover:scale-110 duration-300 bg-purple-300 px-4 py-2 w-full rounded-md text-lg hover:bg-purple-500 cursor-pointer font-bold hover:text-white"
              />
            </form>
            <Dialog.Close>
              <button
                onClick={() => setOpen(false)}
                type="submit"
                className="fixed top-2 right-2 font-black font-mono"
              >
                <img src="/cancel-icon.png" className="w-5" alt="" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default ShopAddItem;
