import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./consts";
import httpClient from "../../../../../../services/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UsersService } from "../../../../../../services/users";
import { RolesService } from "../../../../../../services/roles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const useFormViewModel = (userId) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isLoadingUser,
    isError: isErrorUsers,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => UsersService.findById(userId),
    enabled: !!userId,
  });

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: () => RolesService.findAll(),
    refetchOnMount: false,
  });

  const onSubmitHandler = async (data) => {
    const body = userId
      ? {
          name: data.name,
          email: data.email,
          roleId: Number(data.role),
        }
      : {
          name: data.name,
          email: data.email,
          password: data.password,
          roleId: Number(data.role),
        };

    try {
      if (userId) {
        await httpClient.put(`/users/${userId}`, body);
        queryClient.refetchQueries({ queryKey: ["user", userId] });
      } else {
        await httpClient.post("/users", body);
      }
      queryClient.refetchQueries({ queryKey: ["users"] });

      router.push("/dashboard/users");
    } catch (error) {
      const response = error?.response;
      let errorMessage = "Falha ao criar um novo usuário!";
      if (response) {
        if (response.status === 409) {
          errorMessage = "Usuário já existente!";
        }
        setError("role", { message: errorMessage });
      } else {
        alert("Ocorreu um erro inesperado. Por favor, tente novamente.");
      }
    }
  };

  useEffect(() => {
    if (userId && data?.data) {
      reset({
        name: data.data.name,
        email: data.data.email,
        password: "1234",
        role: data.data.role.id.toString(),
      });
    }
  }, [userId, data, reset]);

  return {
    roles: rolesData?.data || [],
    errors,
    isDirty,
    isSubmitting,
    isLoading: isLoadingRoles || isLoadingUser,
    isError: isErrorUsers || isErrorRoles,
    register,
    handleSubmit,
    onSubmitHandler,
  };
};
