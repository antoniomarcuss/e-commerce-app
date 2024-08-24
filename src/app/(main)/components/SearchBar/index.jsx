import PropTypes from "prop-types";

import { GoSearch } from "react-icons/go";
import { useSearchViewModel } from "./useSearchViewModel";

const SearchBar = ({ onSearch, onChange }) => {
  const { register, handleSubmit, onsubmitHandler, onChangeHandler } =
    useSearchViewModel(onSearch, onChange);

  return (
    <form
      onSubmit={handleSubmit(onsubmitHandler)}
      className="flex items-center  gap-x-2"
    >
      <input
        type="search"
        className="border p-2 rounded-lg outline-none w-full md:w-[80%] "
        placeholder="Pesquisar produto"
        {...register("searchValue", { onChange: onChangeHandler })}
      />
      <button
        type="submit"
        className="border p-2 rounded-full bg-primary hover:opacity-90 text-white "
      >
        <GoSearch className="text-xl" />
      </button>
    </form>
  );
};

export default SearchBar;
SearchBar.propTypes = {
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
};
