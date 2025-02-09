import PropTypes from "prop-types";
import { IoCartOutline } from "react-icons/io5";
import formatToCurrency from "../../../../utils/formatToCurrency";
import { useProductCardViewModel } from "./useProductCardViewModel";

import { userCartStore } from "../../../../stores/cartStore";
import CartModal from "../../../../components/CartModal";
import Link from "next/link";
import { BASE_URL } from "../../../../consts";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const { addToCart, openCartModal } = useProductCardViewModel(product);
  const items = userCartStore(({ items }) => items);

  const imageUrl = product.imgSrc?.startsWith("http")
    ? product.imgSrc
    : `${BASE_URL}/${product.imgSrc.replace(/^\//, "")}`;

  
  console.log('imageUrl', imageUrl);
  
  return (
    <div className=" rounded-lg border  ">
      <Link href={`viewProduct/${product.id}`}>
        <abbr title="Ver produto">
          <div>
            <Image
              src={product.imgSrc ? `${imageUrl}` : "./defalt.webp"}
              width={150}
              height={150}
              alt="nome"
              className=" object-contain rounded-t-lg "
            />
          </div>
        </abbr>
      </Link>
      <div className=" p-2 md:px-4 ">
        <h2 className="text-sm md:text-md font-medium text-gray-800 ">
          {product.name}
        </h2>
        <span className="text-xs md:text-md text-gray-400 font-medium ">
          Restam {product.stock} no estoque
        </span>
        <button
          className="bg-primary text-white w-full p-2 rounded-lg mt-2 flex justify-center items-center gap-1 hover:bg-blue-600 transition-colors duration-200 "
          type="button"
          onClick={addToCart}
        >
          <IoCartOutline className="text-xl  " />
          <span className="text-sm md:text-md">
            {formatToCurrency(product.price)}
          </span>
        </button>
        {openCartModal && <CartModal items={items} />}
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
};
