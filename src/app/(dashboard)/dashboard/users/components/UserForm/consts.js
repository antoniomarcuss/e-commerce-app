import * as yup from "yup";
export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Minimo de 3 caractéries"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(4, "Mínimo de 4 dígitos"),
  role: yup.string().required("Campo obrigatório"),
});
