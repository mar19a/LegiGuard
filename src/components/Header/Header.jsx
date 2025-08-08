import React from "react";
import Navbar from "./Navbar";
import DemoBar from "./DemoBar";
import Banner from "./Banner";

const Header = () => {
  return (
    <div className="relative">
      <img
        src="/deco/Rectangle.svg"
        alt="Protection Icon"
        className="absolute top-0 left-0 w-2xl h-2xl -z-10"
      />

      <div className="myContainer">
        <Navbar />
        <DemoBar />
        <Banner />
      </div>
    </div>
  );
};

export default Header;
