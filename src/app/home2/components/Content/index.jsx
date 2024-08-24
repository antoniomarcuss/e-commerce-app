"use client";
import React from "react";
import { useHomeContentViewModel } from "./useHomeContentViewModel";
import SearchBar from "../SearchBar";
import Spinner from "@/components/Spinner";
import ProductCard from "../ProductCard";
import Pagination from "@/components/Pagination";

const HomeContent = ({ data, defaultPage }) => {
  const {
    searchedProducts,
    searchValue,
    products,
    page,
    totalPages,
    isLoading,
    changePage,
    onChangeSearchHandler,
  } = useHomeContentViewModel(data, defaultPage);

  return (
    <>
      <SearchBar onChange={onChangeSearchHandler} />
      <div className="mt-10  ">
        <h1 className="font-medium text-3xl">Produtos</h1>
        {isLoading ? (
          <div className="flex flex-col gap-4 justify-center items-center  max-w-80 w-full m-auto min-h-[50vh] ">
            <Spinner />
          </div>
        ) : (
          <>
            {searchValue ? (
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:grid-cols-5 mt-6  justify-items-center   sm:justify-items-start  ">
                {searchedProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 gap-2 lg:grid-cols-5 mt-6  justify-items-center   sm:justify-items-start  ">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
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
