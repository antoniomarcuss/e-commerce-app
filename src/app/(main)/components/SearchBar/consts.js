import * as yup from "yup";
export const schema = yup.object().shape({
  searchValue: yup.string().required(),
});
