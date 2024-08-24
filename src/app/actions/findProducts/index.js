"use server";

import { ProductsService } from "@/services/products";

const findProducts = async (page, perPage = 10) => {
  const { data } = await ProductsService.findAll(page, perPage);
  console.log(data);
  return data;
};

export default findProducts;
