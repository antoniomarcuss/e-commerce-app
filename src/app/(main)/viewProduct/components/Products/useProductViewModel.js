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
    refetchOnMount: false,
  });

  return {
    product: product?.data || [],
    isLoading,
    isError,
  };
};

export default useProductViewModel;
