import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
const Modal = ({ title, onClose, onCancel, content, onConfirm, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="  fixed top-0 left-0 w-full h-full bg-black bg-opacity-30    z-50 flex  justify-center items-center  ">
      <div className="bg-white p-6 border rounded-lg flex flex-col gap-y-6 w-96 mx-1 md:w-96">
        <header className="flex justify-between items-center">
          <span className="font-medium text-3xl">{title}</span>
          <button type="button">
            <IoMdClose onClick={onClose} className="text-2xl " />
          </button>
        </header>
        <main>
          <p className="text-gray-800 text-lg">{content}</p>
        </main>
        <footer className="mt-2">
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              className="flex-1 border p-4 rounded-lg bg-red-400 text-white font-medium transition-colors duration-300 hover:bg-red-500"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              id="confirm"
              type="button"
              className="flex-1 border p-4 rounded-lg bg-green-500 text-white font-medium transition-colors duration-300 hover:bg-green-600"
              onClick={onConfirm}
            >
              Confirmar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
