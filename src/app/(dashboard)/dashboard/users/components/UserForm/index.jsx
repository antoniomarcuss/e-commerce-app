import PropTypes from "prop-types";
import { useFormViewModel } from "./useFormViewModel";
import Spinner from "../../../../../../components/Spinner";
const UserForm = ({ userId }) => {
  const {
    roles,
    errors,
    isDirty,
    isSubmitting,
    isLoading,
    isError,
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
      )}
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

export default UserForm;
UserForm.propTypes = {
  userId: PropTypes.string,
};
