import React from "react";
import OrderList from "../components/OrderList";
import { getCookie } from "../utils/cookies";
import router from "next/router";
import Header from "../components/Header";
function orders() {
  const isAuthenticated = getCookie("isAuthenticated");

  if (isAuthenticated == "false") router.push("/");
  return (
    <div>
      <Header />
      <OrderList />
    </div>
  );
}

export default orders;
