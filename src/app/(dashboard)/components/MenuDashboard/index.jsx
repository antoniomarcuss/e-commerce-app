import { PropTypes } from "prop-types";
import { MdExitToApp } from "react-icons/md";
import { IoMdAppstore } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
const MenuDashboard = ({
  openSetting,
  handleCloseSetting,
  handleOpenSetting,
  leaveHandler,
}) => {
  return (
    <AnimatePresence>
      {openSetting && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black"
            onClick={handleCloseSetting}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900  fixed left-0 top-0  right-0  p-7 md:top-auto md:bottom-0  flex  justify-between"
          >
            <button onClick={handleOpenSetting}>
              <MdExitToApp className="text-xl  rotate-180 hover:text-blue-200" />
            </button>
            <div className="flex  justify-between gap-6  ">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-blue-200"
              >
                <IoMdAppstore />
                ir à Loja
              </Link>
              <button
                id="logout"
                className="flex items-center gap-2 font-medium hover:text-red-300"
                type="button"
                onClick={leaveHandler}
              >
                <AiOutlineLogout />
                Sair
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuDashboard;

MenuDashboard.propTypes = {
  openSetting: PropTypes.bool.isRequired,
  handleCloseSetting: PropTypes.func.isRequired,
  handleOpenSetting: PropTypes.func.isRequired,
  leaveHandler: PropTypes.func.isRequired,
};
