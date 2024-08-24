"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../stores/authStore";

export const useDashboardLoginViewModel = () => {
  const user = useAuthStore(({ user }) => user);
  const router = useRouter();
  useEffect(() => {
    if (user && user.role.name === "ADMIN") {
      router.push("/dashboard/users");
    }
  }, [user, router]);
};
