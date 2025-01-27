import React from "react";

import MiniCart from "cart/MiniCart";
import Login from "cart/Login";

const Header = () => {
  return (
    <div className="p-5 bg-blue-500 text-3xl font-bold">
      <div className="flex">
        <div className="flex-grow flex">Fidget Spinner World</div>
        <div className="flex-end relative">
          <MiniCart />
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Header;
