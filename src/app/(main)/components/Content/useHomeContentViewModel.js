import { useState } from "react";
import useFetchProducts from "@/hooks/useFetchProducts";
import { throttle } from "@/utils/throttle";
import { ProductsService } from "@/services/products";
export const useHomeContentViewModel = (defaultPage) => {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { products, page, totalPages, isLoading, changePage } =
    useFetchProducts({
      perPage: 10,
      defaultPage,
    });

  const onChangeSearchHandler = throttle(async (value) => {
    if (value) {
      setSearchValue(value);
      const { data } = await ProductsService.search(value);
      setSearchedProducts(data);
      return;
    }
    setSearchValue("");
  }, 500);

  return {
    searchedProducts,
    searchValue,
    products,
    page,
    totalPages,
    isLoading,
    changePage,
    onChangeSearchHandler,
  };
};
