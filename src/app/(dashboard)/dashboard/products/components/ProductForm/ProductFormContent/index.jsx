"use client";
import { Controller } from "react-hook-form";
import { BASE_URL } from "@/consts";
import Image from "next/image";
import { useProductFormViewModel } from "../useProductFormViewModel";
import DropFileZone from "../components/DropFileZone";
const ProductFormContent = ({ productId }) => {
  const {
    file,
    categories,
    formState,
    control,
    register,
    reset,
    handleSubmit,
    onSubmitHandler,
    onPriceChangeHandler,
    onStockChangeHandler,
    insertImg,
  } = useProductFormViewModel(productId);
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      autoComplete="off"
      className="flex px-6 py-8 w-full  md:w-96 flex-col gap-2 bg-white p-6 rounded-lg  "
    >
      <>
        <label className="flex items-center gap-x-4">
          <span>Inserir Imagem ?</span>
          <input
            type="checkbox"
            className="toggle"
            {...register("insertImg")}
          />
        </label>

        {insertImg && (
          <div>
            {file && (
              <div className="w-36 h-36 mb-2   m-auto  ">
                <Image
                  className="w-full h-full object-contain "
                  src={
                    typeof file === "string"
                      ? `${BASE_URL}/${file}`
                      : URL.createObjectURL(file)
                  }
                  width={100}
                  height={100}
                  alt="Imagem carregada"
                />
              </div>
            )}
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <DropFileZone onDrop={(files) => field.onChange(files[0])} />
              )}
            />
            {file?.name}
            <span className="text-red-400">
              {formState.errors.file?.message}
            </span>
          </div>
        )}
        <label className="flex flex-col gap-y-1 ">
          <span className="font-medium text-lg">Nome: </span>
          <input
            className="border w-full outline-none p-3 md:p-2 rounded-lg"
            type="text"
            placeholder=" Nome"
            {...register("name")}
          />
          <span className="text-red-500">{formState.errors.name?.message}</span>
        </label>
        <label className="flex flex-col gap-y-1 ">
          <span className="font-medium text-lg">Preço: </span>
          <input
            className="border w-full outline-none p-3 md:p-2 rounded-lg"
            type="text"
            placeholder=" Preço"
            {...register("price", { onChange: onPriceChangeHandler })}
          />
          <span className="text-red-500">
            {formState.errors.price?.message}
          </span>
        </label>
        <label className="flex flex-col gap-y-1 ">
          <span className="font-medium text-lg">Estoque: </span>
          <input
            className="border w-full outline-none p-3 md:p-2 rounded-lg"
            type="text"
            placeholder=" Estoque"
            {...register("stock", { onChange: onStockChangeHandler })}
          />
          <span className="text-red-500">
            {formState.errors.stock?.message}
          </span>
        </label>
        <label className="flex flex-col gap-y-1 ">
          <span className="font-medium text-lg">Descrição: </span>
          <textarea
            className="border p-2 h-24 outline-none rounded-lg"
            placeholder="Escreva aqui"
            {...register("description")}
          ></textarea>
          <span className="text-red-500">
            {formState.errors.description?.message}
          </span>
        </label>

        <label className="flex flex-col gap-y-1 mt-2 ">
          <span className="font-medium text-lg">Categoria: </span>
          <select
            className="border p-2 outline-none rounded-lg "
            {...register("category")}
          >
            <option value="">Selecione</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <span className="text-red-500">
            {formState.errors.category?.message}
          </span>
        </label>
      </>

      <button
        type="submit"
        className="mt-7 bg-primary py-3 disabled:bg-opacity-30 
        disabled:cursor-not-allowed rounded-lg text-white hover:bg-blue-500 md:py-2 "
        disabled={!formState.isDirty || formState.isSubmitting}
      >
        {productId ? "Editar" : "Cadastrar"}
      </button>
      <button
        className="mt-2 bg-red-400 py-3 disabled:bg-opacity-30 
       rounded-lg text-white hover:bg-red-500 md:py-2 "
        type="button"
        onClick={() => reset()}
      >
        Resetar
      </button>
    </form>
  );
};

export default ProductFormContent;
