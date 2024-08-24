import { useEffect, useState } from "react";
import { ProductsService } from "../../services/products";
import { useQuery } from "@tanstack/react-query";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const useFetchProducts = ({ defaultPage = 1, perPage = 15 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(defaultPage);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => (await ProductsService.findAll(page, perPage)).data,
  });

  useEffect(() => {
    setTotalPages(data?.numberOfPages || 1);
    const pageFromParams = Number(searchParams.get("page"));
    if (pageFromParams && pageFromParams > 0) {
      setPage(pageFromParams);
      return;
    }
    setPage(1);
  }, [searchParams, data]);

  const changePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setPage(pageNumber);
    router.push(`${pathname}?page=${pageNumber}`);
  };

  return {
    products: data?.products || [],
    page,
    totalPages,
    isLoading,
    isError,
    changePage,
  };
};

export default useFetchProducts;
