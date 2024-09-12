import React from "react";
import Header from "../../components/Header";

const HomeLayout = ({ children }) => {
  return (
    <div className="custom-container ">
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
