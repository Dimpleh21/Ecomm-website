import React from "react";
import Header from "@/components/Header";

const EcommerceLayout = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default EcommerceLayout;
