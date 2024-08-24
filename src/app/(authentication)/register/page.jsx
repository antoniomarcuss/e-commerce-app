import Image from "next/image";
import registerImage from "@/assets/register-page-img.svg";
import RegisterCard from "./components/RegisterCard";
const Register = () => {
  return (
    <div className=" md:h-screen md:flex  items-center  ">
      <div className="flex-1 md:pr-2  max-w-80 my-1  md:max-w-full m-auto   ">
        <Image
          className="w-full h-full"
          src={registerImage}
          alt="img de registro"
        />
      </div>
      <div className="flex justify-center items-center bg-gray-100 flex-1 border-l  h-full ">
        <RegisterCard />
      </div>
    </div>
  );
};

export default Register;
