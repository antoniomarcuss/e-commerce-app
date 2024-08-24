import CategoryForm from "../../components/CategoryForm";

const EditCategory = ({ params: { categoryId } }) => {
  return (
    <div className="custom-container">
      <h1 className="text-3xl font-medium">Editar Categoria</h1>
      <CategoryForm categoryId={categoryId} />
    </div>
  );
};

export default EditCategory;
