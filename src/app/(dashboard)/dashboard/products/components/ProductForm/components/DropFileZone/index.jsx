import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

const DropFileZone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className=" flex justify-center border-2 border-dashed border-gray-300 p-8 rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} />
      <span>Coloque a Imagem aqui!</span>
    </div>
  );
};

export default DropFileZone;

DropFileZone.propTypes = {
  onDrop: PropTypes.func.isRequired,
};
