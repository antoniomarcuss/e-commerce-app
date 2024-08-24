import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../consts";
import { useRouter } from "next/navigation";
import { AuthService } from "../../../../../services/auth";
import { UsersService } from "../../../../../services/users";
import { useAuthStore } from "../../../../../stores/authStore";
import { useEffect } from "react";
export const useLoginCardViewModel = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const user = useAuthStore(({ user }) => user);

  const setUser = useAuthStore(({ setUser }) => setUser);
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const { data: responseData } = await AuthService.login(data);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("refreshToken", responseData.refreshToken);
      const res = await UsersService.getMe();
      setUser(res.data);
      router.push("/");
    } catch ({ response }) {
      setError("root", {
        type: "manual",
        message: "Credenciais erradas" || "Não foi possivel fazer login",
      });
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return { register, handleSubmit, onSubmit, errors };
};
