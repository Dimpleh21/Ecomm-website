import Sidebar from "@/components/Sidebar";
import React from "react";

const Dashboardlayout = ({ children }) => {
  return (
    <div className="Flex h-screen">
      <Sidebar />
      {children}
    </div>
  );
};

export default Dashboardlayout;
