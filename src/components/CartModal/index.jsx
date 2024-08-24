import { PropTypes } from "prop-types";
import { FaCheckCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
const CartModal = ({ items }) => {
  return (
    <div className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex  justify-center items-center ">
      <div className="   bg-white opacity-80 shadow-lg  py-10 border rounded-lg flex flex-col  items-center  w-96  md:w-96 text-center mx-2 gap-8 ">
        <div className="flex justify-center items-center gap-4">
          <span className="text-lg  text-primary ">Adicionado ao carrinho</span>
          <IoCartOutline className="text-3xl text-primary  " />
          <span className=" w-6 h-6  bg-primary rounded-full text-white relative bottom-4 right-6 ">
            {items.length}
          </span>
        </div>

        <FaCheckCircle className="text-5xl text-primary" />
      </div>
    </div>
  );
};

export default CartModal;

CartModal.propTypes = {
  items: PropTypes.array.isRequired,
};
