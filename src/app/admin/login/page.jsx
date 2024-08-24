"use client";
import Image from "next/image";
import dashboardLoginImage from "../../../assets/dashboardLoginImage.svg";
import LoginCard from "./components/LoginCard";
import { useDashboardLoginViewModel } from "./useDashboardLoginViewModel";

const DashboardLogin = () => {
  useDashboardLoginViewModel();
  return (
    <div className=" md:h-screen md:flex  items-center  ">
      <div className="flex-1 pr-2   max-w-96  md:max-w-full m-auto   ">
        <Image
          className="w-full "
          src={dashboardLoginImage}
          alt="Mulher no mercado"
        />
      </div>
      <div className="flex justify-center items-center bg-gray-100 flex-1 border-l  h-full ">
        <LoginCard />
      </div>
    </div>
  );
};

export default DashboardLogin;
