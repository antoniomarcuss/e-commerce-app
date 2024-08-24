import { useState } from "react";
import { throttle } from "@/utils/throttle";
import { ProductsService } from "@/services/products";
import { useRouter } from "next/navigation";
import findProducts from "@/app/actions/findProducts";
export const useHomeContentViewModel = (data) => {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState(data.products);
  const [page, setPage] = useState(data.page);
  const [totalPages, setTotalPages] = useState(data.numberOfPages);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const changePage = async (pageNumber) => {
    if (pageNumber < 1 || pageNumber > data.totalPages) {
      return;
    }
    setPage(pageNumber);
    router.push(`/home2/?page=${pageNumber}`);
    setIsLoading(true);
    const res = await findProducts(pageNumber);
    setProducts(res.products);
    setTotalPages(res.numberOfPages);
    setIsLoading(false);
  };

  const onChangeSearchHandler = throttle(async (value) => {
    if (value) {
      setSearchValue(value);
      const { data } = await ProductsService.search(value);
      setSearchedProducts(data);
      return;
    }
    setSearchValue("");
  }, 800);

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
