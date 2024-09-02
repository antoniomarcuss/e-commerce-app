import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoryContent from "./components/CategoryContent";
import { CategoriesService } from "@/services/categories";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";

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
    <div className="custom-container">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Categorias</h1>
        <Link href="/dashboard/categories/create">
          <IoAdd className="text-4xl text-primary hover:opacity-75 " />
        </Link>
      </div>
      <HydrationBoundary state={client}>
        <CategoryContent />
      </HydrationBoundary>
    </div>
  );
};

export default Categories;
