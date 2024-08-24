import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "./consts";
import { useRouter } from "next/navigation";
import { AuthService } from "../../../../../services/auth";
import { useAuthStore } from "../../../../../stores/authStore";
import { UsersService } from "../../../../../services/users";

export const useRegisterCardViewModel = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const setUser = useAuthStore(({ setUser }) => setUser);
  const onSubmit = async (data) => {
    try {
      await AuthService.register(data);
      const response = await AuthService.login(data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      const res = await UsersService.getMe();
      setUser(res.data);
      router.push("/");
    } catch ({ response }) {
      if (response.status === 400) {
        setError("email", {
          type: "manual",
          message: "Email inválido",
        });
        return;
      }
      if (response.status === 409) {
        setError("root", {
          type: "manual",
          message: (response.data.message = "Usuário já existente!"),
        });
        return;
      }
    }
  };

  return { errors, register, handleSubmit, onSubmit };
};
