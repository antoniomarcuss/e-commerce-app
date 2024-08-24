import { FaRegUser } from "react-icons/fa";
import { MdImageSearch } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
export const links = [
  {
    path: "/dashboard/users",
    icons: <FaRegUser />,
    name: "Usuários",
  },
  {
    path: "/dashboard/products",
    icons: <MdImageSearch />,
    name: "Produtos",
  },
  {
    path: "/dashboard/categories",
    icons: <TbCategory />,
    name: "Categorias",
  },
];
