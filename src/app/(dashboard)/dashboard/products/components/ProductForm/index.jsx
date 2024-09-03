import PropTypes from "prop-types";
import ProductFormContent from "./ProductFormContent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ProductsService } from "@/services/products";

const ProductForm = async ({ productId }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: async () => (await ProductsService.findById(productId)).data,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductFormContent productId={productId} />
    </HydrationBoundary>
  );
};

export default ProductForm;
ProductForm.propTypes = {
  productId: PropTypes.string,
};
