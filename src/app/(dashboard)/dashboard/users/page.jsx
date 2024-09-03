import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import UserContext from "./components/UserContent";

const Dashboard = () => {
  return (
    <div className="custom-container  ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Usuários</h1>
        <Link href="/dashboard/users/create">
          <IoAdd className="text-4xl text-primary hover:opacity-75 " />
        </Link>
      </div>
      <UserContext />
    </div>
  );
};

export default Dashboard;
