import * as yup from "yup";
export const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(4, "Mínimo de 4 caractéries"),
});
