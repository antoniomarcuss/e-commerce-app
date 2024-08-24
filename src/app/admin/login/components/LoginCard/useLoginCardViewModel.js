import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { schema } from "./consts";
import { AuthService } from "../../../../../services/auth";
import { UsersService } from "../../../../../services/users";
import { useAuthStore } from "../../../../../stores/authStore";

export const useLoginCardViewModel = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const setUser = useAuthStore(({ setUser }) => setUser);
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const { data: responseData } = await AuthService.login(data);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("refreshToken", responseData.refreshToken);
      const { data: user } = await UsersService.getMe();
      setUser(user);

      if (user.role.name === "ADMIN") {
        router.push("/dashboard/users");
        return;
      }
      setError("password", { message: "Email ou senha incorretos!" });
    } catch ({ response }) {
      if (response.status !== 200) {
        setError("password", {
          type: "manual",
          message: "Email ou senha incorretos!",
        });
      }
    }
  };
  return { register, handleSubmit, onSubmit, errors };
};
