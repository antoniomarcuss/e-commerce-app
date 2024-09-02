"use client";

import Spinner from "@/components/Spinner";
import { useCategoryFormViewModel } from "../useCategoryFormViewModel";
const CategoryFormContent = ({ categoryId }) => {
  const {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    isDirty,
    isSubmitting,
    isLoading,
    isError,
  } = useCategoryFormViewModel(categoryId);
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      autoComplete="off"
      className="flex px-6 py-8 w-full  md:w-96 flex-col gap-2 bg-white p-6 rounded-lg  "
    >
      {isLoading ? (
        <div className="flex justify-center items-center min-h-80">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="flex text-center md:text-start justify-center items-center min-h-80  ">
          Ops, ocorreu um erro, verifique sua conexão com a internet.
        </div>
      ) : (
        <>
          <label className="flex flex-col gap-y-1 ">
            <span>Nome: </span>
            <input
              className="border w-full outline-none p-3 md:p-2 rounded-lg"
              type="text"
              placeholder=" Nome"
              {...register("name")}
            />
            <span className="text-red-500">{errors.name?.message}</span>
          </label>
        </>
      )}

      <button
        type="submit"
        className="mt-7 bg-primary py-3 disabled:bg-opacity-30 
        disabled:cursor-not-allowed rounded-lg text-white hover:bg-blue-500 md:py-2 "
        disabled={!isDirty || isSubmitting}
      >
        {categoryId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default CategoryFormContent;
