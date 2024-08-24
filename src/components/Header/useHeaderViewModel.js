import { userCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
const useHeaderViewModel = () => {
  const { user, setUser } = useAuthStore();
  const items = userCartStore(({ items }) => items);
  const [openSetting, setOpenSetting] = useState(false);
  const handleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };
  const router = useRouter();

  const handleCloseSetting = () => {
    setOpenSetting(false);
  };

  const leaveHandler = () => {
    setOpenSetting(false);
    setUser(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  return {
    user,
    items,
    openSetting,
    handleOpenSetting,
    handleCloseSetting,
    leaveHandler,
  };
};

export default useHeaderViewModel;
