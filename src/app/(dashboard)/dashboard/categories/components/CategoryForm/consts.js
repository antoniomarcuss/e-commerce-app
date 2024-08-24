import * as yup from "yup";
export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Minimo de 3 caractéries"),
});
