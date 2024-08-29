import { LogicModal } from "@/components/Modal/logicModal";
import { ProductsService } from "@/services/products";

const useProductContentViewModel = (page, totalPages, changePage) => {
  const paginationProps = {
    page: page,
    isPreviousDisabled: page === 1,
    isNextDisabled: page === totalPages,
    onClickPrevious: () => changePage(page - 1),
    onClickNext: () => changePage(page + 1),
  };

  const { modalProps, setProductId, setModalIsOpen, deletingUserIds } =
    LogicModal(ProductsService, "product");

  const handleDelete = (id) => {
    setProductId(id);
    setModalIsOpen(true);
  };

  return {
    modalProps,
    handleDelete,
    deletingUserIds,
    paginationProps,
  };
};

export default useProductContentViewModel;
