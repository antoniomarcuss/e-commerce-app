import { LogicModal } from "../../../../components/Modal/logicModal";
import { CategoriesService } from "../../../../services/categories";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesViewModel = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await CategoriesService.findAll()).data,
  });
  const {
    modalProps,
    productId: categoryIdModal,
    setProductId,
    mutation,
    setModalIsOpen,
    deletingUserIds,
  } = LogicModal(CategoriesService, "categories");

  const handleDelete = (id) => {
    setProductId(id);
    setModalIsOpen(true);
  };

  return {
    categories,
    isLoading,
    isError,
    categoryIdModal,
    setProductId,
    mutation,
    setModalIsOpen,
    modalProps,
    handleDelete,
    deletingUserIds,
  };
};
