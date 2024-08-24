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
    queryFn: () => CategoriesService.findById(categoryId),
    enabled: !!categoryId,
  });

  useEffect(() => {
    if (categoryId && data?.data) {
      reset({ name: data.data.name });
    }
  }, [categoryId, data, reset]);

  const onSubmitHandler = async (formData) => {
    try {
      if (categoryId) {
        await CategoriesService.update(categoryId, formData);
        queryClient.setQueryData(["categories"], (current) => {
          const updatedCategories = current?.data.map((category) =>
            category.id.toString() === categoryId
              ? { ...category, name: formData.name }
              : category
          );
          return { ...current, data: updatedCategories };
        });
      } else {
        const newCategory = await CategoriesService.create(formData);

        // Atualização otimista
        queryClient.setQueryData(["categories"], (current) => ({
          ...current,
          data: [...current?.data, newCategory.data],
        }));
      }
      router.push("/dashboard/categories");
      queryClient.invalidateQueries("categories");
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
