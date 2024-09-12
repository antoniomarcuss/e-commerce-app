import PropTypes from "prop-types";
import CategoryFormContent from "./CategoryFormContent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { CategoriesService } from "@/services/categories";

const CategoryForm = async ({ categoryId }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => (await CategoriesService.findById(categoryId)).data,
  });

  const client = dehydrate(queryClient);

  return (
    <HydrationBoundary state={client}>
      <CategoryFormContent categoryId={categoryId} />;
    </HydrationBoundary>
  );
};

export default CategoryForm;

CategoryForm.propTypes = {
  categoryId: PropTypes.string,
};
