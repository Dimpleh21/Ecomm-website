import React from "react";
import { Eye } from "lucide-react";
const EyeItem = () => {
  return (
    <div className="flex justify-center items-center bg-white p-1.5 rounded-full cursor-pointer">
      <Eye size={20} color="gray" />
    </div>
  );
};

export default EyeItem;
