import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "../../../../services/products";

const useProductViewModel = (productId) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductsService.findById(productId),
    refetchOnMount: false,
  });

  return {
    product: product?.data || [],
    isLoading,
    isError,
  };
};

export default useProductViewModel;
