import React from "react";
import ProductCard from "../../../ProductCard";

const ProductList = ({ item }) => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6  justify-items-center sm:justify-items-start  gap-y-3  ">
      {item.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
