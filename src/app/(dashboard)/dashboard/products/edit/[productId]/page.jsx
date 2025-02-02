import { ProductsService } from "@/services/products";
import ProductForm from "../../components/ProductForm";

// export const generateStaticParams = async () => {
//   const { data } = await ProductsService.findAll();

//   return data.products.map((product) => ({
//     productId: String(product.id),
//   }));
// };

const EditProduct = ({ params: { productId } }) => {
  return (
    <div className="custom-container">
      <h1 className="text-3xl font-medium">Editar Produto</h1>
      <ProductForm productId={productId} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default EditProduct;
