import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import Products from "../components/Products";
import { ProductsService } from "@/services/products";

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

const ViewProduct = ({ params: { productId } }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <IoMdArrowBack className="text-2xl hover:text-blue-500 text-primary" />
        </Link>
      </div>
      <Products productId={productId} />
    </div>
  );
};

export default ViewProduct;
