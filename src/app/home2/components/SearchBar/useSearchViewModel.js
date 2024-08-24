import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./consts";
export const useSearchViewModel = (onSearch, onChange) => {
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmitHandler = (data) => {
    onSearch(data.searchValue);
  };

  const onChangeHandler = (e) => {
    const searchValue = e.target.value;
    setValue("searchValue", searchValue);
    onChange(searchValue);
  };

  return { register, handleSubmit, onsubmitHandler, onChangeHandler };
};
