"use client";
import { useHomeContentViewModel } from "./useHomeContentViewModel";
import SearchBar from "../SearchBar";
import Pagination from "@/components/Pagination";
import ProductList from "./components/ProductList";

const HomeContent = ({ defaultPage }) => {
  const {
    searchedProducts,
    searchValue,
    products,
    page,
    totalPages,
    changePage,
    onChangeSearchHandler,
  } = useHomeContentViewModel(defaultPage);

  return (
    <>
      <SearchBar onChange={onChangeSearchHandler} />
      <div className="mt-10  ">
        <h1 className="font-medium text-3xl">Produtos</h1>
        <>
          {searchValue ? (
            <>
              {searchedProducts.length === 0 ? (
                <p className=" min-h-60 flex items-center justify-center text-xl text-gray-600">
                  Produto não encontrado.
                </p>
              ) : (
                <ProductList item={searchedProducts} />
              )}
            </>
          ) : (
            <ProductList item={products} />
          )}
        </>
      </div>

      {!searchValue && (
        <Pagination
          page={page}
          isPreviousDisabled={page === 1}
          isNextDisabled={page === totalPages}
          onClickPrevious={() => changePage(page - 1)}
          onClickNext={() => changePage(page + 1)}
        />
      )}
    </>
  );
};

export default HomeContent;
