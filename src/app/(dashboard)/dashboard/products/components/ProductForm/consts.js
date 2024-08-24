import * as yup from "yup";
export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Minimo de 3 caractéries"),
  price: yup.string().required("Campo obrigatório"),
  stock: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  category: yup.string().required("Campo obrigatório"),
  insertImg: yup.boolean().default(false),

  file: yup
    .mixed()
    .nullable()
    .when("insertImg", {
      is: true,
      then: (field) => field.required("Arquivo Obrigatório"),
    }),
});
