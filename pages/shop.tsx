import React from "react";
import Header from "../components/Header";
import ShopAdmin from "../components/ShopAdmin";
import { getCookie } from "../utils/cookies";
import router from "next/router";

const Shop = () => {
  const isAuthenticated = getCookie("isAuthenticated");

  if (isAuthenticated == "false") router.push("/");
  return (
    <div>
      <Header />
      <ShopAdmin />
    </div>
  );
};

export default Shop;
