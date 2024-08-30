import formatToCurrency from "@/utils/formatToCurrency";
import { BASE_URL } from "@/consts";
import Image from "next/image";

import ButtonAddProduct from "../ButtonAddProduct";
import BackButton from "../BackButton";

const Products = ({ data: product }) => {
  return (
    <div>
      <BackButton />
      <div className="min-h-[80vh]  flex items-center justify-center">
        <div className="flex flex-col  md:flex-row gap-2 md:gap-8 items-center justify-center  rounded-md p-2 md:shadow-lg   md:p-6  ">
          <div className=" min-w-80 max-w-60  md:max-w-80  w-full">
            <Image
              className="w-full"
              width={300}
              height={300}
              src={
                product.imgSrc
                  ? `${BASE_URL}/${product.imgSrc}`
                  : "/defalt.webp"
              }
              alt=""
            />
          </div>
          <div className="flex flex-col  w-full gap-4 md:w-96   md:gap-6">
            <h1 className=" text-xl text-blue-900  font-bold md:text-3xl ">
              {product.name}
            </h1>
            <h3 className=" text-gray-500 font-medium">
              {product.description}
            </h3>
            <div className="flex items-center justify-between w-full  ">
              <p className=" text-xl text-blue-900 font-bold ">
                {" "}
                {formatToCurrency(product.price)}
              </p>
              <div>
                <p className=" text-gray-600 font-medium">
                  Restam {product.stock} no stoque{" "}
                </p>
              </div>
            </div>
            <ButtonAddProduct product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
