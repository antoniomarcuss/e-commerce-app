"use client";
import Link from "next/link";
import { useRegisterCardViewModel } from "./useRegisterCardViewModel";

const RegisterCard = () => {
  const { errors, register, handleSubmit, onSubmit } =
    useRegisterCardViewModel();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex p-3  max-w-[500px] w-full  md:max-w-96 flex-col gap-1 bg-white  md:rounded-lg md:shadow-md md:p-6"
      autoComplete="off"
    >
      <h1 className="text-3xl text-center font-medium">Registre-se</h1>
      {errors.root && (
        <p className="text-red-500 text-center md:text-lg my-1">
          {errors.root.message}
        </p>
      )}
      <label className="flex flex-col gap-y-1 ">
        <span className="font-medium">Nome: </span>
        <input
          className="border w-full outline-none p-2 md:p-2 rounded-lg"
          type="text"
          placeholder="Nome"
          {...register("name")}
        />
        <span className="text-red-500">{errors.name?.message}</span>
      </label>
      <label className="flex flex-col gap-y-1 ">
        <span className="font-medium">Email: </span>
        <input
          id="email"
          className="border w-full outline-none p-2 md:p-2 rounded-lg"
          type="text"
          placeholder="E-mail"
          {...register("email")}
        />
        <span className="text-red-500">{errors.email?.message}</span>
      </label>
      <label className="flex flex-col gap-y-1 mt-2 ">
        <span className="font-medium">Senha: </span>
        <input
          className="border w-full outline-none p-2 md:p-2 rounded-lg password"
          type="password"
          placeholder="Senha"
          {...register("password")}
        />
        <span className="text-red-500">{errors.password?.message}</span>
      </label>
      <label className="flex flex-col gap-y-1 mt-2 ">
        <span className="font-medium">Confirmar senha: </span>
        <input
          className="border w-full outline-none p-2 md:p-2 rounded-lg "
          type="password"
          placeholder="Confirmar senha"
          {...register("confirmPassword")}
        />
        <span className="text-red-500">{errors.confirmPassword?.message}</span>
      </label>
      <button
        type="submit"
        className="mt-3 bg-primary p-2 rounded-lg text-white hover:bg-blue-500 md:py-2 outline-none "
      >
        Entrar
      </button>
      <Link
        className=" border rounded-md p-1 mt-2 bg-gray-50 md:p-2 text-center  text-primary hover:text-blue-500 "
        href="/login"
      >
        Já tem conta? faça login aqui!
      </Link>
    </form>
  );
};

export default RegisterCard;
