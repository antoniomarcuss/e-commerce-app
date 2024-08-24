"use client";
import { useLoginCardViewModel } from "./useLoginCardViewModel";

const LoginCard = () => {
  const { register, handleSubmit, onSubmit, errors } = useLoginCardViewModel();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex  px-6 py-8  w-full  md:w-96 flex-col gap-2 bg-white p-6 md:rounded-lg md:shadow-md"
    >
      <label className="flex flex-col gap-y-1 ">
        <span>Email: </span>
        <input
          id="email"
          className="border w-full outline-none p-3 md:p-2 rounded-lg"
          type="text"
          placeholder="E-mail"
          {...register("email")}
        />
        <span className="text-red-500">{errors.email?.message}</span>
      </label>

      <label className="flex flex-col gap-y-1 mt-2 ">
        <span>Senha: </span>
        <input
          id="password"
          className="border w-full outline-none p-3 md:p-2 rounded-lg"
          type="password"
          placeholder="Senha"
          {...register("password")}
        />
        <span className="text-red-500">{errors.password?.message}</span>
      </label>

      {errors.global}
      <button
        type="submit"
        className="mt-7 bg-primary py-3 rounded-lg text-white hover:bg-blue-500 md:py-2 "
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginCard;
