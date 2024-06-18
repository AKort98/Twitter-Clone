import React from "react";
import LogoX from "./LogoX";
import { AiFillHome } from "react-icons/ai";
import { BiHome, BiNotification, BiSearch } from "react-icons/bi";
import { CgMail, CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  return (
    <div className="hidden md:flex flex-col py-2 h-dvh mx-6 fixed  md:w-[50px] lg:w-[200px]">
      <div className="p-2">
        <LogoX size={8} />
      </div>
      <ul className="flex flex-col text-slate-200 text-2xl justify-evenly h-3/5">
        <Link
          to={`/home`}
          className="flex items-center hover:bg-slate-800 p-2 rounded-2xl gap-4 cursor-pointer"
        >
          {location.pathname === "/home" ? <AiFillHome /> : <BiHome />}
          <li className="">Home</li>
        </Link>
        <div className="flex items-center hover:bg-slate-800 p-2 rounded-2xl gap-4 cursor-pointer">
          <BiSearch />
          <li className="">Explore</li>
        </div>
        <div className="flex items-center hover:bg-slate-800 p-2 rounded-2xl gap-4 cursor-pointer">
          <BiNotification />
          <li className="">Notifications</li>
        </div>
        <div className="flex items-center hover:bg-slate-800 p-2 rounded-2xl gap-4 cursor-pointer">
          <CgMail />
          <li className="">Messages</li>
        </div>
        <div className="flex items-center hover:bg-slate-800 p-2 rounded-2xl gap-4 cursor-pointer">
          <CgProfile />
          <li className="">Profile</li>
        </div>
      </ul>
      <input
        type="button"
        value="Post"
        className="bg-blue-800 p-2 rounded-2xl text-white text-xl "
      />
    </div>
  );
}

export default Sidebar;
