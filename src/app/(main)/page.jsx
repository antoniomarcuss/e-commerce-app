import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HomeContent from "./components/Content";
import { BASE_URL } from "@/consts";

const Home = async ({ searchParams }) => {
  let page = 1;
  const perPage = 10;
  if (searchParams.page && searchParams.page > 0) {
    page = Number(searchParams.page);
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", page],
    // queryFn: async () => (await ProductsService.findAll(page, perPage)).data,
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/products?page=${page}&perPage=${perPage}`,
        {
          next: { revalidate: 10 },
        }
      );
      const data = await response.json();
      return data;
    },
  });

  return (
    <div className="min-h-screen ">
      <main className="pt-12 pb-10">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HomeContent defaultPage={page} />
        </HydrationBoundary>
      </main>
    </div>
  );
};

export default Home;
