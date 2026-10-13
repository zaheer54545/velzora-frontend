"use client";

import { useLocation } from "@/lib/router";
import useAuthStore from "../../store/useAuthStore";
import AccountRequired from "../ui/AccountRequired";

const getStoredToken = () => {
  const direct =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("authToken");

  if (direct) return direct;

  try {
    const authStorage = JSON.parse(
      localStorage.getItem("auth-storage") || "{}",
    );

    return authStorage?.state?.token || authStorage?.token || "";
  } catch {
    return "";
  }
};

function ProtectedRoute({ children }) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const initialized = useAuthStore((state) => state.initialized);
  const authToken = token || getStoredToken();

  if (!initialized && authToken) return null;

  if (!user && !authToken) {
    const redirectTo = `${location.pathname}${location.search}`;

    const intent = redirectTo.includes("orders")
      ? "orders"
      : redirectTo.includes("checkout")
        ? "checkout"
        : redirectTo.includes("wishlist")
          ? "wishlist"
          : redirectTo.includes("addresses")
            ? "addresses"
            : "account";

    return (
      <AccountRequired
        redirectTo={redirectTo}
        intent={intent}
        title="Account required"
        subtitle="Please sign in or register to see this content"
      />
    );
  }

  return children;
}

export default ProtectedRoute;
