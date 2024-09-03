"use client";
import React from "react";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import Modal from "@/components/Modal";
import { useDashboardViewModel } from "../../useDashboardViewModel";
const UserContext = () => {
  const {
    users,
    paginationProps,
    isLoading,
    isError,
    handleDelete,
    modalProps,
    mutation,
    deletingUserIds,
  } = useDashboardViewModel();

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-80">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="flex text-center md:text-start justify-center items-center min-h-80  ">
          Ops, ocorreu um erro, verifique sua conexão com a internet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Função</th>
                <th>Criação</th>
                <th>Atualização</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, role, createdAt, updatedAt }) => (
                <tr key={id}>
                  <th>{id}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role.name}</td>
                  <td>{format(new Date(createdAt), "dd/MM/yyyy")}</td>
                  <td>
                    {updatedAt && format(new Date(updatedAt), "dd/MM/yyyy")}
                  </td>
                  <td>
                    <Link
                      className="text-primary hover:text-blue-400 "
                      href={`/dashboard/users/edit/${id}`}
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
              ))}
            </tbody>
          </table>
        </div>
      )}
      {mutation.isError && (
        <div className="text-red-500  font-medium text-center">
          Erro ao deletar o usuário!
        </div>
      )}
      <Pagination {...paginationProps} />
      <Modal {...modalProps} />
    </div>
  );
};

export default UserContext;
