import React from "react";
import BG from "../../Assets/bg.svg";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="bg_container">
        <div className="left_bg">
          <img src={BG} alt="bg" className="bg" />
        </div>
        <div className="right_bg">
          <div className="form_container">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
