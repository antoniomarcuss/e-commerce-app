"use client";
import Link from "next/link";
import { useLoginCardViewModel } from "./useLoginCardViewModel";
const LoginCard = () => {
  const { register, handleSubmit, onSubmit, errors } = useLoginCardViewModel();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex p-3 max-w-[500px] w-full   flex-col gap-1 bg-white mx-3  md:rounded-lg md:shadow-md"
      autoComplete="off"
    >
      <h1 className="text-3xl text-center font-medium">Login</h1>
      <label className="flex flex-col gap-y-1 ">
        <div className="flex justify-between">
          <span>Email: </span>
          {errors.root && (
            <span className="text-red-500">{errors.root.message}</span>
          )}
        </div>
        <input
          className="border w-full outline-none p-2 md:p-2 rounded-lg"
          type="text"
          placeholder="E-mail"
          {...register("email")}
        />
        <span className="text-red-500">{errors.email?.message}</span>
      </label>
      <label className="flex flex-col gap-y-1 mt-2 ">
        <span>Senha: </span>
        <input
          className="border w-full outline-none p-2 md:p-2 rounded-lg"
          type="password"
          placeholder=" Senha"
          {...register("password")}
        />
        <span className="text-red-500">{errors.password?.message}</span>
      </label>
      <button
        type="submit"
        className="mt-3 bg-primary p-2 rounded-lg text-white hover:bg-blue-500 md:py-2 "
      >
        Entrar
      </button>
      <Link
        className=" border rounded-md p-2 mt-2 bg-gray-50 text-center  text-primary hover:text-blue-500 "
        href="/register"
      >
        Não tem conta? Crie a sua aqui!
      </Link>
    </form>
  );
};

export default LoginCard;
