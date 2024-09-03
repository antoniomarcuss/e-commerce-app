import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UsersService } from "../../../../services/users";
import { LogicModal } from "../../../../components/Modal/logicModal";

export const useDashboardViewModel = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => UsersService.find(page, perPage),
  });

  useEffect(() => {
    setTotalPages(users?.data.numberOfPages || 1);
  }, [users?.data.numberOfPages]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setPage(page);
  };

  const paginationProps = {
    page: page,
    isPreviousDisabled: page === 1,
    isNextDisabled: page === totalPages,
    onClickPrevious: () => changePage(page - 1),
    onClickNext: () => changePage(page + 1),
  };

  const {
    modalProps,
    productId,
    setProductId,
    mutation,
    setModalIsOpen,
    deletingUserIds,
  } = LogicModal(UsersService, "users");

  const handleDelete = (id) => {
    setProductId(id);
    setModalIsOpen(true);
  };

  return {
    users: users?.data.users || [],
    paginationProps,
    isLoading,
    isError,
    modalProps,
    productId,
    handleDelete,
    mutation,
    deletingUserIds,
  };
};
