"use client";
import { useHomeContentViewModel } from "./useHomeContentViewModel";
import SearchBar from "../SearchBar";
import ProductCard from "../ProductCard";
import Pagination from "@/components/Pagination";

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
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6 mt-6  justify-items-center sm:justify-items-start   ">
                  {searchedProducts.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-2 sm:gap-x-0 lg:grid-cols-5 xl:grid-cols-6 mt-6  justify-items-center   sm:justify-items-start   ">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
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
