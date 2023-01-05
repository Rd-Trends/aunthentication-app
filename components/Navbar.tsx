import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import {
  MdLogout,
  MdPeople,
  MdPerson,
  MdPersonPinCircle,
} from "react-icons/md";

import useUser from "../hooks/useUser";
import { fancyDisplayedName } from "../utils/fancyDisplayName";
import Logo from "./Logo";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const { user, mutate } = useUser();

  const logout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 204) mutate(undefined);
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 lg:px-20 py-4 md:py-6">
      <Logo />
      <div
        className="relative flex items-center space-x-4"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        {user && user?.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            width={35}
            height={35}
            className="rounded-md"
          />
        ) : (
          <div className="rounded-md w-8 h-8  bg-blue-400 text-white flex items-center justify-center">
            <p className="capitalize  font-bold">
              {user?.name
                ? fancyDisplayedName(user?.name)
                : fancyDisplayedName(user?.email!)}
            </p>
          </div>
        )}
        <p className=" text-xs font-bold hidden md:block">{user?.name}</p>
        <button
          className={` outline-none border-none bg-transparent transition-transform ${
            showDropDown ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaCaretDown />
        </button>
        {showDropDown && (
          <div className="bg-white py-4 px-2 rounded-lg w-[200px] absolute top-10 right-[150%] md:right-[50%] translate-x-1/2 shadow-lg">
            <Link
              href="#"
              className="flex items-center space-x-2 py-3 px-4 font-medium bg-[#F2F2F2] rounded-lg "
            >
              <MdPerson size={20} />
              <span>Profile</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 py-3 px-4 font-medium"
            >
              <MdPeople size={20} />
              <span>Group Chat</span>
            </Link>

            <hr className="bg-[#E0E0E0] h-[2px] my-2" />

            <button
              onClick={logout}
              className="flex items-center w-full space-x-2 py-3 px-4 font-medium text-[#EB5757] rounded-lg "
            >
              <MdLogout size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
