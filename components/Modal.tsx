import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

type Props = {
  triggerOpen?: React.ReactNode;
  overlay?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  submitButton?: any;
};

export function Modal({
  triggerOpen,
  overlay,
  title,
  description,
  children,
  submitButton,
}: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{triggerOpen}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={overlay} />
        <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[85vh] py-6 px-14 flex flex-col gap-2">
          <Dialog.Title className="text-lg font-bold text-center">
            {title}
          </Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          {children}
          <Dialog.Close>
            <button
              type="submit"
              className="fixed top-2 right-2 font-black font-mono"
            >
              <img src="/cancel-icon.png" className="w-5" alt="" />
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button
              onClick={submitButton}
              className="hover:scale-110 duration-300 bg-purple-300 px-4 py-2 w-full rounded-md text-lg hover:bg-purple-500 cursor-pointer font-bold hover:text-white"
            >
              Adicionar
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
