"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./consts";
import { currencyMask } from "./currencyMask";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import currency from "currency.js";
import { ProductsService } from "../../../../../../services/products";
import { CategoriesService } from "../../../../../../services/categories";
import { LogicModal } from "../../../../../../components/Modal/logicModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useProductFormViewModel = (
  productId,
  page,
  totalPages,
  changePage
) => {
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

  const {
    data,
    isLoading: isLoadingId,
    isError: isErrorId,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => await ProductsService.findById(productId),
    enabled: !!productId,
  });

  useEffect(() => {
    if (productId && data?.data) {
      reset({
        name: data.data.name,
        description: data.data.description,
        price: data.data.price.toFixed(2),
        stock: data.data.stock.toString(),
        category: data.data.category.id.toString(),
        file: data.data.imgSrc,
        insertImg: !!data.data.imgSrc,
      });
    }
  }, [productId, data, reset]);

  const {
    data: categoriesData,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoriesService.findAll(),
    refetchOnMount: false,
  });

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
    if (productId) {
      try {
        await ProductsService.update(productId, body);
        if (typeof data.file !== "string") {
          await uploadImage(data.file, productId);
        }
        router.push("/dashboard/products");
        queryClient.refetchQueries({
          queryKey: ["product", productId],
        });
      } catch ({ response }) {
        setError("category", {
          type: "manual",
          message:
            response.data.message || "Ocorreu um erro ao editar o produto!",
        });
      }
    } else {
      try {
        const response = await ProductsService.create(body);
        if (data.insertImg) {
          await uploadImage(data.file, response.data.id);
        }
        router.push("/dashboard/products");
      } catch ({ response }) {
        alert("Ocorreu um erro ao criar o produto ");
      }
    }
    queryClient.refetchQueries({
      queryKey: ["products"],
    });
  };

  const paginationProps = {
    page: page,
    isPreviousDisabled: page === 1,
    isNextDisabled: page === totalPages,
    onClickPrevious: () => changePage(page - 1),
    onClickNext: () => changePage(page + 1),
  };

  const {
    modalProps,
    productId: productIdModal,
    setProductId,
    mutation,
    setModalIsOpen,
    deletingUserIds,
  } = LogicModal(ProductsService, "product");

  const handleDelete = (id) => {
    setProductId(id);
    setModalIsOpen(true);
  };

  return {
    file,
    formState,
    control,
    categories: categoriesData?.data || [],
    insertImg,
    register,
    reset,
    handleSubmit,
    onSubmitHandler,
    onPriceChangeHandler,
    onStockChangeHandler,
    modalProps,
    productIdModal,
    setProductId,
    mutation,
    setModalIsOpen,
    paginationProps,
    isLoading: isLoadingCategory || isLoadingId,
    isError: isErrorCategory || isErrorId,
    handleDelete,
    deletingUserIds,
  };
};
