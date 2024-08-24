import * as yup from "yup";
export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Mínimo de 3 Caractéries"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(4, "Mínimo de 4 caractéries"),
  confirmPassword: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password"), null], "Senhas diferentes"),
});
