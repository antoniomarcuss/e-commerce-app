import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./consts";
import { currencyMask } from "./currencyMask";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import currency from "currency.js";
import { ProductsService } from "../../../../../../services/products";
import { CategoriesService } from "../../../../../../services/categories";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useProductFormViewModel = (productId) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    control,
    formState,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const file = watch("file");
  const insertImg = watch("insertImg");

  const { data } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await ProductsService.findById(productId);
      return data;
    },
    enabled: !!productId,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await CategoriesService.findAll();
      return data;
    },
  });

  useEffect(() => {
    if (productId && data && categoriesData) {
      reset({
        name: data.name,
        description: data.description,
        price: data.price.toFixed(2),
        stock: data.stock.toString(),
        category: data.category.id.toString(),
        file: data.imgSrc,
        insertImg: !!data.imgSrc,
      });
    }
  }, [productId, data, reset, categoriesData]);

  const onPriceChangeHandler = (event) => {
    const { value } = event.target;
    setValue("price", currencyMask(value), { shouldValidate: true });
  };

  const onStockChangeHandler = (event) => {
    const { value } = event.target;
    setValue("stock", value.replace(/\D/g, ""), { shouldValidate: true });
  };

  const uploadImage = async (file, id) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await ProductsService.upload(id, formData);
      } catch (error) {
        alert("Ocorreu um erro ao fazer upload da imagem!");
      }
    }
  };

  const onSubmitHandler = async (data) => {
    const body = {
      name: data.name,
      price: currency(data.price).value,
      stock: data.stock,
      description: data.description,
      categoryId: data.category,
    };

    try {
      if (productId) {
        await ProductsService.update(productId, body);
        if (typeof data.file !== "string" && data.insertImg && data.file) {
          await uploadImage(data.file, productId);
        }
      } else {
        const response = await ProductsService.create(body);
        if (data.insertImg) {
          await uploadImage(data.file, response.data.id);
        }
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      router.push("/dashboard/products");
    } catch ({ response }) {
      setError("category", {
        type: "manual",
        message:
          response.data.message || "Ocorreu um erro ao salvar o produto!",
      });
    }
  };

  return {
    file,
    formState,
    control,
    categories: categoriesData || [],
    insertImg,
    register,
    reset,
    handleSubmit,
    onSubmitHandler,
    onPriceChangeHandler,
    onStockChangeHandler,
  };
};
