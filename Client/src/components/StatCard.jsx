import React from "react";
import { Users, Clock, ClipboardList } from "lucide-react";

const StatCard = ({ icon, title, count }) => {
  return (
    <div className="bg-[#333333] rounded-lg p-4 flex items-center space-x-3">
      <div className="text-gray-100 bg-gray-800 rounded-full p-2">{icon}</div>
      <div>
        <div className="text-sm text-gray-100">{title}</div>
        <div className="text-2xl font-semibold">{count}</div>
      </div>
    </div>
  );
};

export default StatCard;
