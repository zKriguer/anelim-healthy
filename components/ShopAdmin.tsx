import React, { useEffect, useRef, useState } from "react";

import ShopAddItem from "./ShopAddItem";
import { getAllProductsOnShop } from "../utils/fetchers";
import ShopList from "./ShopList";

type Props = {};

const ShopAdmin = (props: Props) => {
  return (
    <div className=" p-10 md:p-32 gap-14 flex flex-col">
      <ShopAddItem />
      <ShopList />
    </div>
  );
};

export default ShopAdmin;
