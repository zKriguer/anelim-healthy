import React, { FormEvent, useEffect, useRef, useState } from "react";
import { getPublicUserData, instertMeals } from "../utils/fetchers";
import { getCookie } from "../utils/cookies";
import { toast } from "react-toastify";

const MealForm: React.FC = () => {
  const [isHealthy, setIsHealthy] = useState<boolean>(false);
  const [userId] = useState<string>(getCookie("userId"));
  const [healthChecked, setHealthChecked] = useState<string>();
  const [notHealthChecked, setNotHealthChecked] = useState<string>();

  const mealRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isHealthy) {
      setHealthChecked("bg-purple-500");
      setNotHealthChecked("bg-transparent");
    } else {
      setHealthChecked("bg-transparent");
      setNotHealthChecked("bg-purple-500");
    }
  }, [isHealthy]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!mealRef.current?.value)
      return toast.error("Coloque algo no campo de comidinha 🙄");

    await instertMeals(userId, {
      mealName: mealRef.current?.value,
      date: new Date().toLocaleString("pt-BR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      isHealthy: isHealthy,
    });

    toast.success("Adicionou uma comidinha 🤗");
  };

  return (
    <div className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px] max-h-[85vh] py-6 px-14 ring-2 ring-purple-600">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-col gap-2 items-center"
      >
        <div className="flex justify-center items-center gap-20 flex-row">
          <div className="flex-col flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setIsHealthy(true);
              }}
              className={`flex items-center ${healthChecked} justify-center flex-col w-fit p-2 rounded-full`}
            >
              <img src="apple.png" alt="" className="w-8" />
            </button>
            <p className="text-left">Saudavel</p>
          </div>

          <div className="flex-col flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setIsHealthy(false);
              }}
              className={`flex items-center ${notHealthChecked} justify-center flex-col w-fit p-2 rounded-full`}
            >
              <img src="/pizza.png" alt="" className="w-8" />
            </button>
            <p className="text-left">N/Saudável</p>
          </div>
        </div>

        <fieldset className="border-[1px] border-violet-500 rounded-sm pb-2 w-full">
          <legend className="mx-2 px-2"> Comidinha </legend>
          <input
            className="outline-0 w-full p-4 text-lg h-1"
            type="text"
            name="meal"
            placeholder="Comidinha aqui 🍔"
            ref={mealRef}
          />
        </fieldset>
        <input
          type="submit"
          value="Enviar"
          className="hover:scale-110 duration-300 bg-purple-300 px-4 py-2 w-full rounded-md text-lg hover:bg-purple-500 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default MealForm;
