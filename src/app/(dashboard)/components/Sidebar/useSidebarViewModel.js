import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../stores/authStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export const useSidebarViewModel = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const pathname = usePathname();

  const leaveHandler = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  useEffect(() => {
    if (!user || user.role.name !== "ADMIN") {
      router.push("/admin/login");
    }
  }, [user, router]);

  const handleOpenSetting = () => {
    setOpenSetting(!openSetting);
  };

  const handleCloseSetting = () => {
    setOpenSetting(false);
  };
  const isActive = (path) => {
    return `border border-white border-b-2 border-t-0 border-r-0 border-l-0  md:border-b-0 md:border-r-2 text-white ${
      pathname === path || pathname.startsWith(path + "/")
        ? "border-opacity-100  text-opacity-100"
        : "text-opacity-80 border-opacity-30"
    }`;
  };

  return {
    leaveHandler,
    isActive,
    pathname,
    handleOpenSetting,
    handleCloseSetting,
    openSetting,
  };
};
