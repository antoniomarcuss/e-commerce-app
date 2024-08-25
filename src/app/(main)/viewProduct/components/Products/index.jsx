"use client";
import { IoCartOutline } from "react-icons/io5";
import formatToCurrency from "@/utils/formatToCurrency";
import CartModal from "@/components/CartModal";
import Spinner from "@/components/Spinner";
import { BASE_URL } from "@/consts";
import Image from "next/image";

import { userCartStore } from "@/stores/cartStore";
import { useProductCardViewModel } from "@/app/(main)/components/ProductCard/useProductCardViewModel";
import useProductViewModel from "./useProductViewModel";

const Products = ({ productId }) => {
  const { product, isLoading, isError } = useProductViewModel(productId);
  const { addToCart, openCartModal } = useProductCardViewModel(product);
  const items = userCartStore(({ items }) => items);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-svh">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="flex text-center md:text-start justify-center items-center min-h-svh  ">
          Ops, ocorreu um erro, verifique sua conexão com a internet.
        </div>
      ) : (
        <div className="min-h-[80vh]  flex items-center justify-center">
          <div className="flex flex-col  md:flex-row gap-2 md:gap-8 items-center justify-center  rounded-md p-2 md:shadow-lg   md:p-6  ">
            <div className=" max-w-60  md:max-w-80  w-full">
              <Image
                className="w-full"
                width={300}
                height={300}
                src={
                  product.imgSrc
                    ? `${BASE_URL}/${product.imgSrc}`
                    : "./defalt.webp"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col  w-full gap-4 md:w-96   md:gap-6">
              <h1 className=" text-xl text-blue-900  font-bold md:text-3xl ">
                {product.name}
              </h1>
              <h3 className=" text-gray-500 font-medium">
                {product.description}
              </h3>
              <div className="flex items-center justify-between w-full  ">
                <p className=" text-xl text-blue-900 font-bold ">
                  {" "}
                  {formatToCurrency(product.price)}
                </p>
                <div>
                  <p className=" text-gray-600 font-medium">
                    Restam {product.stock} no stoque{" "}
                  </p>
                </div>
              </div>

              <div className=" w-full ">
                <button
                  className="bg-primary text-white w-full p-3 rounded-lg   hover:bg-blue-600 transition-colors duration-200 "
                  type="button"
                  onClick={addToCart}
                >
                  <div className="flex  justify-center md:items-center  gap-2">
                    <IoCartOutline className="text-2xl  " />
                    <span className="text-lg">Adicionar ao carrinho</span>
                  </div>
                </button>
                {openCartModal && <CartModal items={items} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
