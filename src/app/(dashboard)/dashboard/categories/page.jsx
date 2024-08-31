import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoryContent from "./components/CategoryContent";
import { CategoriesService } from "@/services/categories";

export const generateStaticParams = async () => {
  const { data } = await CategoriesService.findAll();
  console.log(data);

  return data.map((category) => ({ categoryId: String(category.id) }));
};

const Categories = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => (await CategoriesService.findAll()).data,
  });

  const client = dehydrate(queryClient);

  return (
    <HydrationBoundary state={client}>
      <CategoryContent />
    </HydrationBoundary>
  );
};

export default Categories;
