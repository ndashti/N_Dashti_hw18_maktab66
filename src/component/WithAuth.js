import React, { useContext } from "react";

import { UserContext } from "../context/ContextAuth";
import Auth from "./Auth";

const WithAuth = (Component) => {
  const WithAuthComponent = () => {
    const { userInfo } = useContext(UserContext);
    console.log(userInfo);

    return <>{userInfo ? <Component /> : <Auth />}</>;
  };
  return WithAuthComponent;
};
export default WithAuth;
