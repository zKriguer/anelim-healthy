import React, { useEffect, useState } from "react";
import ShopAddItem from "./ShopAddItem";
import { getCookie } from "../utils/cookies";
import { getPublicUserData } from "../utils/fetchers";
import { user } from "../utils/types/types";
import RenderIf from "./RenderIf";
import ShopListAdmin from "./ShopListAdmin";
import ShopListUser from "./ShopListUser";

const ShopAdmin = () => {
  const [userId] = useState(getCookie("userId"));
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    getPublicUserData(userId).then((response) => setUserData(response));
  }, []);
  return (
    <>
      <RenderIf condition={userData?.isAdmin}>
        <div className="p-10 md:p-32 gap-14 flex flex-col justify-center">
          <ShopAddItem />
          <ShopListAdmin />
        </div>
      </RenderIf>
      <RenderIf condition={!userData?.isAdmin}>
        <div className="p-10 md:p-32 gap-14 flex flex-col justify-center">
          <ShopListUser />
        </div>
      </RenderIf>
    </>
  );
};

export default ShopAdmin;
