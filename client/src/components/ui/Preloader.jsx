import React from "react";

function Preloader({ type = "svg", className = "" }) {
  return (
    <div className={`fixed inset-0 flex justify-center items-center w-full h-full ${className} z-50`}>
      <img
        src="/src/assets/9.svg"
        alt="Loading..."
        className="max-w-full max-h-full"
      />
    </div>
  );
}

export default Preloader;
