"use client";
import { format } from "date-fns";
import { useCategoriesViewModel } from "../../useCategoriesViewModel";
import Spinner from "@/components/Spinner";
import { ImSpinner8 } from "react-icons/im";
import { FaTrash } from "react-icons/fa6";
import Modal from "@/components/Modal";
import Link from "next/link";

const CategoryContent = () => {
  const {
    categories,
    isLoading,
    isError,
    modalProps,
    handleDelete,
    deletingUserIds,
  } = useCategoriesViewModel();
  return (
    <>
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className=" flex justify-center min-h-[60vh]  items-center   ">
            <Spinner />
          </div>
        ) : isError ? (
          <div className=" flex justify-center items-center min-h-[50vh]">
            <p className="text-center ">
              Ops, ocorreu um erro, verifique sua conexão com a internet.
            </p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Quantidade de produtos</th>
                <th>Criação</th>
                <th>Atualização</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map(
                ({ id, name, productsCount, createdAt, updatedAt }) => (
                  <tr key={id}>
                    <th>{id}</th>
                    <td>{name}</td>
                    <td className="  text-center md:text-start ">
                      {productsCount}
                    </td>
                    <td>{format(new Date(createdAt), "dd/MM/yyyy")}</td>
                    <td>
                      {updatedAt && format(new Date(updatedAt), "dd/MM/yyyy")}
                    </td>

                    <td>
                      <Link
                        className="text-primary hover:text-blue-400"
                        href={`/dashboard/categories/edit/${id}`}
                      >
                        Editar
                      </Link>
                    </td>
                    <td>
                      <button
                        className="text-red-400 hover:text-red-500"
                        onClick={() => handleDelete(id)}
                        disabled={deletingUserIds.includes(id)}
                      >
                        {deletingUserIds.includes(id) ? (
                          <ImSpinner8 className="text-red-500 w-5 animate-spin" />
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
      <Modal {...modalProps} />
    </>
  );
};

export default CategoryContent;
