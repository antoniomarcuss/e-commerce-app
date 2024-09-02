import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CategoriesService } from "../../../../../../services/categories";
import { schema } from "./consts";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCategoryFormViewModel = (categoryId) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => (await CategoriesService.findById(categoryId)).data,
    enabled: !!categoryId,
  });

  useEffect(() => {
    if (categoryId && data) {
      reset({ name: data.name });
    }
  }, [categoryId, data, reset]);

  const updateCategory = async (formData) => {
    await CategoriesService.update(categoryId, formData);
    queryClient.setQueryData(["categories"], (current) => {
      const updatedCategories = current.map((category) =>
        category.id.toString() === categoryId
          ? { ...category, name: formData.name }
          : category
      );
      return updatedCategories;
    });
  };

  const createCategory = async (formData) => {
    const newCategory = (await CategoriesService.create(formData)).data;

    queryClient.setQueryData(["categories"], (current) => [
      ...current,
      newCategory,
    ]);
  };

  const onSubmitHandler = async (formData) => {
    try {
      if (categoryId) {
        updateCategory(formData);
      } else {
        createCategory(formData);
      }
      router.push("/dashboard/categories");
    } catch (error) {
      setError("name", {
        message: categoryId
          ? "Não foi possível editar a categoria!"
          : "Não foi possível criar a categoria!",
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    isDirty,
    isSubmitting,
    isLoading,
    isError,
  };
};
