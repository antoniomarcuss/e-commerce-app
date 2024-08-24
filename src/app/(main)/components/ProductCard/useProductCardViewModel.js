import { useState } from "react";
import { useCart } from "../../../../hooks/useCart";

export const useProductCardViewModel = (product) => {
  const { addItem } = useCart();
  const [openCartModal, setOpenCartModal] = useState(false);
  const addToCart = () => {
    addItem(product);
    setOpenCartModal(true);
    setTimeout(() => {
      setOpenCartModal(false);
    }, 1000);
  };
  return { addToCart, openCartModal };
};
