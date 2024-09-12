"use client";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

import Menu from "../Menu";

import useHeaderViewModel from "./useHeaderViewModel";

const Header = () => {
  const {
    user,
    items,
    openSetting,
    handleOpenSetting,
    handleCloseSetting,
    leaveHandler,
  } = useHeaderViewModel();
  return (
    <header className=" py-4 flex justify-between items-center relative ">
      {user && (
        <div className="flex gap-4 items-center justify-center">
          <button id="settings" onClick={handleOpenSetting}>
            <CiSettings className="text-2xl md:text-2xl hover:animate-spin   " />
          </button>
        </div>
      )}

      <Menu
        openSetting={openSetting}
        handleCloseSetting={handleCloseSetting}
        handleOpenSetting={handleOpenSetting}
        leaveHandler={leaveHandler}
        user={user}
      />

      <div className="flex w-full gap-x-3 items-center  justify-end   ">
        {user ? (
          <span className="text-lg">
            Olá, <span className="text-primary ">{user.name}</span>
          </span>
        ) : (
          <span>
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </span>
        )}
        <Link href="/cart" className="flex ">
          <IoCartOutline className="text-2xl text-gray-700 mr-3 " />
          <span className="bg-primary top-1 right-0 rounded-full w-6 h-6 flex justify-center items-center   text-white absolute">
            {items.length}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
