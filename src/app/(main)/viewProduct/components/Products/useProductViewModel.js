'"use client";';
import { ProductsService } from "@/services/products";
import { useQuery } from "@tanstack/react-query";

const useProductViewModel = (productId) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductsService.findById(productId),
    staleTime: Infinity,
  });

  return {
    product,
    isLoading,
    isError,
  };
};

export default useProductViewModel;
