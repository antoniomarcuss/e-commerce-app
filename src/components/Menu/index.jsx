import { PropTypes } from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { MdExitToApp } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import Link from "next/link";
const Menu = ({
  openSetting,
  handleCloseSetting,
  handleOpenSetting,
  leaveHandler,
  user,
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
            className="bg-gray-900 fixed left-0 top-0  right-0  p-6 md:px-10 lg:px-16  flex z-10 justify-between max-w-[1300px] m-auto "
          >
            <button onClick={handleOpenSetting}>
              <MdExitToApp className="text-xl text-white rotate-180 hover:text-blue-200" />
            </button>
            <div className="flex  justify-between gap-6 ">
              {user?.role.name === "ADMIN" && (
                <Link
                  href="/dashboard/users"
                  className="flex items-center gap-2  text-white  hover:text-blue-200"
                >
                  <RxDashboard />
                  Dashboard
                </Link>
              )}
              <button
                className="flex items-center gap-2 font-medium text-white hover:text-rose-400"
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

export default Menu;

Menu.propTypes = {
  openSetting: PropTypes.bool.isRequired,
  handleCloseSetting: PropTypes.func.isRequired,
  handleOpenSetting: PropTypes.func.isRequired,
  leaveHandler: PropTypes.func.isRequired,
  user: PropTypes.object,
};
