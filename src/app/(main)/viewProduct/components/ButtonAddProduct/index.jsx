"use client";
import { useProductCardViewModel } from "@/app/(main)/components/ProductCard/useProductCardViewModel";
import CartModal from "@/components/CartModal";
import { userCartStore } from "@/stores/cartStore";
import React from "react";
import { IoCartOutline } from "react-icons/io5";

const ButtonAddProduct = ({ product }) => {
  const items = userCartStore(({ items }) => items);
  const { addToCart, openCartModal } = useProductCardViewModel(product);
  return (
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
  );
};

export default ButtonAddProduct;
