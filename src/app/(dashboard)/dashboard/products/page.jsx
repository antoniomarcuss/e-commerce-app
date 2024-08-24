import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import ProductsContent from "./components/ProductsContent";
import { Suspense } from "react";

const Products = () => {
  return (
    <div className="custom-container">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Produtos</h1>
        <Link href="/dashboard/products/create">
          <IoAdd className="text-4xl text-primary hover:opacity-75 " />
        </Link>
      </div>
      <Suspense>
        <ProductsContent />
      </Suspense>
    </div>
  );
};

export default Products;
