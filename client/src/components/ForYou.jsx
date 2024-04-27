import React from "react";

function ForYou() {
  return (
    <div className="text-white w-full flex justify-between border-b-[0.5px] border-b-gray-700 font-semibold">
      <div className="text-white flex-1 p-4 text-center cursor-pointer hover:bg-[#111111af] ">
        For You
      </div>
      <div className="text-white flex-1 p-4 text-center cursor-pointer hover:bg-[#111111af] ">
        Following
      </div>
    </div>
  );
}

export default ForYou;
