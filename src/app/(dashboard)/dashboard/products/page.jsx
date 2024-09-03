import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import ProductsContent from "./components/ProductsContent";
import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ProductsService } from "@/services/products";

const Products = async ({ searchParams }) => {
  let page = 1;
  const perPage = 10;
  if (searchParams.page && searchParams.page > 0) {
    page = Number(searchParams.page);
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", page],
    queryFn: async () => (await ProductsService.findAll(page, perPage)).data,
  });

  return (
    <div className="custom-container">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Produtos</h1>
        <Link href="/dashboard/products/create">
          <IoAdd className="text-4xl text-primary hover:opacity-75 " />
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <ProductsContent defaultPage={page} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Products;
