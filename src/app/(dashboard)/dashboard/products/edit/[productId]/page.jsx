import ProductForm from "../../components/ProductForm";

const EditProduct = ({ params: { productId } }) => {
  return (
    <div className="custom-container">
      <h1 className="text-3xl font-medium">Editar Produto</h1>
      <ProductForm productId={productId} />
    </div>
  );
};

export default EditProduct;
