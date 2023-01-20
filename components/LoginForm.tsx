import React, { FormEvent, useRef } from "react";
import { getPrivateData } from "../utils/fetchers";
import { useRouter } from "next/router";
import { setCookie } from "../utils/cookies";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function fetchData(email: string, password: string) {
    if (!email || !password) return;
    try {
      const response = await getPrivateData(email, password);
      const user = await response.json();

      if (response.ok) {
        setCookie("isAuthenticated", "true");
        setCookie("userName", user.name);
        setCookie("userId", user._id);
        toast.success("Usuário autenticado com sucesso! 🥰");
        router.push("/dashboard");
      } else {
        setCookie("isAuthenticated", "false");
        setCookie("userName", "");
        setCookie("userId", "");
        router.push("/");
        toast.error("Usuário inválido 🤬");
      }
    } catch (error) {
      setCookie("isAuthenticated", "false");
      setCookie("userId", "");
      setCookie("userName", "");
      router.push("/");
      console.log(error);
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      await fetchData(email, password);
    } else {
      toast.error("Coloca alguma coisa aí nesses inputs 😐");
    }
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="flex flex-col gap-6"
    >
      <fieldset className="border-[1px] border-violet-500 rounded-sm pb-2">
        <legend className="mx-2 px-2"> Email </legend>
        <input
          className="outline-0 w-full p-4 text-lg h-1"
          type="email"
          name="email"
          placeholder="Email aqui 🥰"
          ref={emailRef}
        />
      </fieldset>

      <fieldset className="border-[1px] border-violet-500 rounded-sm pb-2">
        <legend className="mx-2 px-2"> Senha </legend>
        <input
          className="outline-0 w-full p-4 text-lg h-1"
          type="password"
          name="email"
          placeholder="Senha aqui 🤭"
          ref={passwordRef}
        />
      </fieldset>

      <input
        type="submit"
        value="Login"
        className="bg-purple-300 px-4 py-2 md:w-full rounded-md text-lg md:hover:bg-purple-500 cursor-pointer"
      />
    </form>
  );
};

export default LoginForm;
