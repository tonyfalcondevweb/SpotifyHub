import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={
        className + " py-8 px-8 min-h-screen w-full bg-slate-900 text-white"
      }
    >
      {children}
    </div>
  );
};

export default Container;
