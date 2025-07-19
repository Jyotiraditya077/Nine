import React from "react";
import loaderSvg from "@/assets/9.svg";

function Preloader({ type = "svg", className = "" }) {
  return (
    <div className={`fixed inset-0 flex justify-center items-center w-full h-full ${className} z-50`}>
      <img
        src={loaderSvg}
        alt="Loading..."
        className="max-w-full max-h-full"
      />
    </div>
  );
}

export default Preloader;
