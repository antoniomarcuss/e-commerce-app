import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const LogicModal = (service, query) => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [deletingUserIds, setDeletingUserIds] = useState([]);
  const modalClose = () => {
    setModalIsOpen(false);
    setProductId(null);
  };

  const mutation = useMutation({
    mutationFn: (productId) => service.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(query);
      modalClose();
    },
    onSettled: () => {
      setDeletingUserIds((prev) => prev.filter((id) => id !== productId));
    },
  });

  const removeItem = async (productId) => {
    setDeletingUserIds((prev) => [...prev, productId]);
    setTimeout(() => {
      mutation.mutate(productId);
    }, 500);
  };

  const onConfirmModal = () => {
    if (productId) {
      removeItem(productId);
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
    modalProps,
    productId,
    setProductId,
    mutation,
    setModalIsOpen,
    deletingUserIds,
  };
};
