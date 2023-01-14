import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getCookie, setCookie } from "../utils/cookies";
import { getPublicUserData } from "../utils/fetchers";
import { user } from "../utils/types/types";

const Header = () => {
  const [userId] = useState<string>(getCookie("userId"));
  const [userData, setUserData] = useState<user>();

  useEffect(() => {
    getPublicUserData(userId).then((response) => setUserData(response));
  }, []);

  const router = useRouter();
  const button: React.ReactNode = (
    <button
      onClick={() => {
        setCookie("isAuthenticated", "false");
        setCookie("userId", "");
        setCookie("userName", "");
        router.push("/");
      }}
      className="rounded-md shadow-md shadow-black"
    >
      <p
        className={`bg-zinc-900 w-full text-white hover:text-black px-4 py-2 rounded-md hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 transition hover:scale-110 duration-200`}
      >
        Sair
      </p>
    </button>
  );

  return (
    <div className="bg-purple-500 font-bold text-base">
      <div className="flex items-center justify-around p-2">
        <div>
          <p
            onClick={() => router.push("/dashboard")}
            className={`cursor-pointer hover:text-transparent hover:bg-clip-text text-white hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] transition hover:scale-110 duration-200`}
          >
            Anelim
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <p className="bg-zinc-900 text-white hover:text-black px-4 py-2 rounded-md transition hover:scale-110 duration-200 hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 cursor-pointer shadow-md shadow-black">
            Saldo: {userData?.saldo} 💸
          </p>
          <button
            onClick={() => {
              router.push("/shop");
            }}
            className="rounded-md shadow-md shadow-black"
          >
            <p
              className={`bg-zinc-900 w-full text-white hover:text-black px-4 py-2 rounded-md hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 transition hover:scale-110 duration-200`}
            >
              Loja
            </p>
          </button>
          {button}
        </div>
      </div>
    </div>
  );
};

export default Header;
