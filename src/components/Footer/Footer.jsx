import React from "react";
import JoinNow from "./JoinNow";
import Links from "./Links";

const Footer = () => {
  return (
    <div className="relative">
      <div
        className="relative backdrop-blur-[32px] pt-6"
        style={{
          background:
            "url('/BackgroundNoise.png') lightgray 0% 0% / 78.125px 78.125px repeat",
        }}
      >
        <img
          src="/deco/RectangleF.svg"
          alt="Protection Icon"
          className="absolute bottom-0 left-0 w-2xl h-2xl blur-lg -z-10"
        />

        <div className="myContainer">
          <JoinNow />
          <Links />
        </div>
      </div>
    </div>
  );
};

export default Footer;
