"use client";
import { FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import formatToCurrency from "../../../utils/formatToCurrency";
import { BASE_URL } from "../../../consts";
import Modal from "../../../components/Modal";
import { useCartViewModel } from "./useCartViewModel";
import { ImSpinner8 } from "react-icons/im";

import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import Spinner from "../../../components/Spinner";
import Image from "next/image";
const Cart = () => {
  const {
    items,
    total,
    changeQuantity,
    modalProps,
    setProductId,
    setModalIsOpen,
    handleInputChange,
    isError,
    isLoading,
    deletingId,
  } = useCartViewModel();

  return (
    <div>
      <main className=" pt-10">
        <div className="flex items-center justify-between text-xl font-medium pb-2 md:pb-4">
          <Link href="/">
            <IoMdArrowBack className="text-2xl hover:text-blue-500 text-primary" />
          </Link>
          <span id="total">Total: {formatToCurrency(total)}</span>
        </div>
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
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>SubTotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ id, imgSrc, name, price, qty, subTotal }) => (
                  <tr key={id}>
                    <td className="w-28  ">
                      <Image
                        src={imgSrc ? `${BASE_URL}/${imgSrc}` : "/defalt.webp"}
                        alt={name}
                        width={100}
                        height={100}
                        className=" w-full object-container  "
                      />
                    </td>
                    <td>{name}</td>
                    <td>{formatToCurrency(price)}</td>
                    <td className="">
                      <div className="  flex  items-center gap-x-2 ">
                        <button
                          type="button"
                          onClick={() => changeQuantity(id, qty - 1)}
                          className="md:text-lg text-red-400 minus-btn"
                        >
                          <FiMinus />
                        </button>
                        <input
                          type="text"
                          className="  text-center w-10 outline-none p-2 border rounded-lg "
                          value={qty}
                          onChange={(e) => handleInputChange(e, id)}
                        />
                        <button
                          type="button"
                          onClick={() => changeQuantity(id, qty + 1)}
                          className="md:text-lg text-primary plus-btn"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td>{formatToCurrency(subTotal)}</td>
                    <td>
                      <button
                        onClick={() => {
                          setProductId(id);
                          setModalIsOpen(true);
                        }}
                        type="button"
                        className="flex items-center justify-center delete-item-to-cart"
                      >
                        {deletingId === id ? (
                          <ImSpinner8 className="text-red-500 w-5 animate-spin" />
                        ) : (
                          <FaTrash className="text-red-400 md:hover:text-red-500 text-md" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className=" flex justify-end">
          <button
            type="button "
            className="bg-primary mt-5 text-right font-medium text-white px-6 py-3 rounded-lg hover:bg-blue-500 disabled:bg-gray-500 "
            disabled={isLoading}
          >
            Finalizar compra
          </button>
        </div>
        <Modal {...modalProps} />
      </main>
    </div>
  );
};

export default Cart;
