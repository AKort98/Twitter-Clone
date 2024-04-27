import React from "react";
import { BiBell, BiEnvelope, BiHome, BiSearch, BiSend } from "react-icons/bi";
import { BsMailbox, BsMailbox2Flag } from "react-icons/bs";
import { MdMail } from "react-icons/md";

function Navbar() {
  return (
    <div className="text-white fixed bottom-0 flex border-t-[1px] border-t-slate-800 w-full justify-around p-3 bg-black">
      <span>
        <BiHome className="size-7" />
      </span>
      <span>
        <BiSearch className="size-7" />
      </span>
      <span>
        <BiBell className="size-7" />
      </span>
      <span>
        <BiEnvelope className="size-7" />
      </span>
    </div>
  );
}

export default Navbar;
