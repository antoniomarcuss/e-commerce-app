import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import Products from "../components/Products";
import { ProductsService } from "@/services/products";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const generateMetadata = async ({ params: { productId } }) => {
  const { data } = await ProductsService.findById(productId);

  return {
    title: data.name,
    description: data.description,
    openGraph: {
      images: [
        {
          url: "./ecomerceHome.png",
          width: 800,
          height: 600,
          alt: "img products",
        },
      ],
      title: data.name,
      description: data.description,
    },
  };
};

const ViewProductById = async ({ params: { productId } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await ProductsService.findById(productId);

      return data;
    },
  });

  const client = dehydrate(queryClient);

  return (
    <div>
      <div>
        <Link href="/">
          <IoMdArrowBack className="text-2xl hover:text-blue-500 text-primary" />
        </Link>
      </div>
      <HydrationBoundary state={client}>
        <Products productId={productId} />
      </HydrationBoundary>
    </div>
  );
};

export default ViewProductById;
