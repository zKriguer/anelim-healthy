import Header from "../components/Header";
import MealForm from "../components/MealForm";
import { getCookie } from "../utils/cookies";
import router from "next/router";

function dashboard() {
  const isAuthenticated = getCookie("isAuthenticated");

  if (isAuthenticated == "false") router.push("/");
  return (
    <>
      <Header />
      <button
        onClick={() => {
          router.push("/orders");
        }}
        className="rounded-md shadow-md shadow-black top-20 w-full fixed"
      >
        <p
          className={`bg-zinc-900 w-full text-white hover:text-black p-2 rounded-md hover:bg-gradient-to-r from-cyan-500 via-yellow-200 to-pink-500 transition hover:scale-110 duration-200`}
        >
          Meus pedidos
        </p>
      </button>
      <MealForm />
    </>
  );
}

export default dashboard;
