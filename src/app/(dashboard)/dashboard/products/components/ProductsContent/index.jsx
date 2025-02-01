"use client";
import formatToCurrency from "@/utils/formatToCurrency";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import { BASE_URL } from "@/consts";
import Image from "next/image";
import useFetchProducts from "@/hooks/useFetchProducts";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";

import Link from "next/link";
import useProductContentViewModel from "./useProductContentViewModel";

const ProductsContent = ({ defaultPage }) => {
  const { products, page, totalPages, changePage } = useFetchProducts({
    perPage: 10,
    defaultPage,
  });
  const { modalProps, handleDelete, deletingUserIds, paginationProps } =
    useProductContentViewModel(page, totalPages, changePage);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Categoria</th>
              <th>Criação</th>
              <th>Atualização</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              ({
                id,
                name,
                imgSrc,
                price,
                stock,
                category,
                createdAt,
                updatedAt,
              }) => (
                <tr key={id}>
                  <th>{id}</th>
                  <td>
                    <Image
                      src={imgSrc ? `${BASE_URL}${imgSrc}` : "/defalt.webp"}
                      alt={name}
                      className="w-10"
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>{name}</td>
                  <td>{formatToCurrency(price)}</td>
                  <td>{stock}</td>
                  <td>{category.name}</td>
                  <td>{format(new Date(createdAt), "dd/MM/yyyy")}</td>
                  <td>
                    {updatedAt && format(new Date(updatedAt), "dd/MM/yyyy")}
                  </td>

                  <td>
                    <Link
                      className="text-primary hover:text-blue-400 "
                      href={`/dashboard/products/edit/${id}`}
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
      </div>

      <Modal {...modalProps} />
      <Pagination {...paginationProps} />
    </>
  );
};

export default ProductsContent;
