import React from "react";
import Header from "../components/Header";
import ShopAdmin from "../components/ShopAdmin";

type Props = {};

const Shop = (props: Props) => {
  return (
    <div>
      <Header />
      <ShopAdmin />
    </div>
  );
};

export default Shop;
