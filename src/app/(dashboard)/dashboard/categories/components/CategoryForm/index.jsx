import PropTypes from "prop-types";
import CategoryFormContent from "./CategoryFormContent";

const CategoryForm = ({ categoryId }) => {
  return <CategoryFormContent />;
};

export default CategoryForm;

CategoryForm.propTypes = {
  categoryId: PropTypes.string,
};
