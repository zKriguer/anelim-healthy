import React, { useEffect, useState } from "react";
import { getAllProductsOnShop } from "../utils/fetchers";

type Props = {};

const ShopList = (props: Props) => {
  const [productData, setProductData] = useState<any>();

  async function fetchProductData() {
    try {
      const data = await getAllProductsOnShop();
      setProductData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProductData();

    const interval = setInterval(() => {
      fetchProductData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row w-full justify-around">
      {productData?.map((item, index) => {
        return (
          <div
            key={index}
            className="w-56 bg-zinc-800 hover:bg-gray-700 hover:scale-110 transition duration-300 ease-in hover:ring-2 hover:ring-indigo-600 hover:cursor-pointer rounded-md "
          >
            <img
              className="w-full object-cover rounded-md"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              <h2 className="text-base text-white">Produto: {item.title}</h2>
              <p className="text-base text-white">Preço: {item.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShopList;
