"use client";
import React from "react";
import Spinner from "@/components/Spinner";
import { useFormViewModel } from "../useFormViewModel";

const UseFormContent = ({ userId }) => {
  const {
    roles,
    errors,
    isDirty,
    isSubmitting,

    register,
    handleSubmit,
    onSubmitHandler,
  } = useFormViewModel(userId);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      autoComplete="off"
      className="flex py-8 w-full  md:w-96 flex-col gap-2 bg-white  rounded-lg  "
    >
      <>
        <label className="flex flex-col gap-y-1 ">
          <span>Nome: </span>
          <input
            className="border w-full outline-none p-3 md:p-2 rounded-lg"
            type="text"
            name="name"
            placeholder="Nome"
            {...register("name")}
          />
          <span className="text-red-500">{errors.name?.message}</span>
        </label>
        <label className="flex flex-col gap-y-1 ">
          <span>Email: </span>
          <input
            className="border w-full outline-none p-3 md:p-2 rounded-lg"
            type="text"
            placeholder="E-mail"
            {...register("email")}
          />
          <span className="text-red-500">{errors.email?.message}</span>
        </label>
        {userId ? null : (
          <label className="flex flex-col gap-y-1 mt-2 ">
            <span>Senha: </span>
            <input
              className="border w-full outline-none p-3 md:p-2 rounded-lg"
              type="password"
              placeholder="Senha"
              {...register("password")}
            />
            <span className="text-red-500">{errors.password?.message}</span>
          </label>
        )}
        <label className="flex flex-col gap-y-1 mt-2 ">
          <span>Cargo: </span>
          <select
            className="border p-3 outline-none rounded-lg "
            {...register("role")}
          >
            <option value="">Selecione</option>
            {roles.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <span className="text-red-500">{errors.role?.message}</span>
        </label>
      </>

      <button
        type="submit"
        className="mt-4 bg-primary py-3 disabled:bg-opacity-30 
            disabled:cursor-not-allowed rounded-lg text-white hover:bg-blue-500 md:py-2 "
        disabled={!isDirty || isSubmitting}
      >
        {userId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default UseFormContent;
