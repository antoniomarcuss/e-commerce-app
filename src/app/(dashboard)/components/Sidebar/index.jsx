"use client";
import Link from "next/link";
import { links } from "./linksPath";
import { useSidebarViewModel } from "./useSidebarViewModel";
import { CiSettings } from "react-icons/ci";

import MenuDashboard from "../MenuDashboard";

const Sidebar = () => {
  const {
    leaveHandler,
    isActive,
    pathname,
    handleCloseSetting,
    handleOpenSetting,
    openSetting,
  } = useSidebarViewModel();

  return (
    <aside className="bg-primary z-10 fixed w-full p-2 py-6 flex flex-row-reverse md:justify-between text-white top-0 left-0 shadow-lg md:flex-col md:h-full md:w-60 md:rounded-r-lg md:p-8">
      <ul className="flex md:flex-col gap-6 md:gap-4">
        {links.map(({ path, icons, name }) => (
          <Link key={name} href={path} className={isActive(path)}>
            <div className="flex flex-col md:flex-row items-center gap-x-3">
              <span className="hidden md:block">{icons}</span>
              <div className="flex flex-col md:flex-row gap-1 justify-between w-full items-center">
                <li>{name}</li>
              </div>
            </div>
          </Link>
        ))}
      </ul>

      <div className="flex w-full ml-4 md:ml-0 ">
        <button id="settings" onClick={handleOpenSetting}>
          <CiSettings className="text-xl md:text-2xl hover:animate-spin" />
        </button>

        <MenuDashboard
          openSetting={openSetting}
          handleCloseSetting={handleCloseSetting}
          leaveHandler={leaveHandler}
          handleOpenSetting={handleOpenSetting}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
