import Products from "../components/Products";
import { ProductsService } from "@/services/products";
import { BASE_URL } from "@/consts";

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

export const generateStaticParams = async () => {
  const { data } = await ProductsService.findAll();
  return data.products.map((product) => ({
    productId: String(product.id),
  }));
};

const ViewProductById = async ({ params: { productId } }) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`, {
    next: { revalidate: 10 },
  });
  const data = await response.json();

  return (
    <div>
      <Products data={data} />
    </div>
  );
};

export default ViewProductById;
