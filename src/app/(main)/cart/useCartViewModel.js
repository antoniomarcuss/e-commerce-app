import { useState } from "react";

import { useCart } from "../../../hooks/useCart";

export const useCartViewModel = () => {
  const [productId, setProductId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const {
    items,
    total,
    changeQuantity,
    removeItem,
    handleInputChange,
    isError,
    isLoading,
  } = useCart();

  const modalClose = () => {
    setModalIsOpen(false);
    setProductId(null);
  };

  const onConfirmModal = () => {
    if (productId) {
      setDeletingId(productId);
      setTimeout(() => {
        removeItem(productId);
        setDeletingId(null);
      }, 500);
      setModalIsOpen(false);
    }
  };

  const modalProps = {
    isOpen: modalIsOpen,
    onClose: modalClose,
    onCancel: modalClose,
    onConfirm: onConfirmModal,
    title: "Tem certeza? ",
    content: "Essa ação não pode ser desfeita.",
  };

  return {
    items,
    total,
    modalProps,
    changeQuantity,
    setProductId,
    setModalIsOpen,
    handleInputChange,
    isError,
    isLoading,
    deletingId,
  };
};
