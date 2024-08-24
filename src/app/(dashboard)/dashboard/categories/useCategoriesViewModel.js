import { LogicModal } from "../../../../components/Modal/logicModal";
import { CategoriesService } from "../../../../services/categories";
import { useQuery } from "@tanstack/react-query";

export const useCategoriesViewModel = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesService.findAll,
    refetchOnMount: false,
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
    categories: data?.data || [],
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
