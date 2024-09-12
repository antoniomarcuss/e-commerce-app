import { CategoriesService } from "@/services/categories";
import CategoryForm from "../../components/CategoryForm";

export const generateStaticParams = async () => {
  const { data } = await CategoriesService.findAll();

  return data.map((category) => ({ categoryId: String(category.id) }));
};

const EditCategory = ({ params: { categoryId } }) => {
  return (
    <div className="custom-container">
      <h1 className="text-3xl font-medium">Editar Categoria</h1>
      <CategoryForm categoryId={categoryId} />
    </div>
  );
};

export default EditCategory;
