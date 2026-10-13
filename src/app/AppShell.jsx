"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "@/lib/router";
import { migrateLegacyStorage } from "@/lib/migrateLegacyStorage";
import { LanguageProvider } from "../context/LanguageContext";
import useAuthStore from "../store/useAuthStore";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/navigation/MobileBottomNav";
import WishlistToastManager from "../components/ui/WishlistToastManager";
import AuthRequiredModal from "../components/ui/AuthRequiredModel";
import PageTransition from "../components/ui/PageTransition";
import RouteProgressBar from "../components/ui/RoutesProgressBar";

// Carry saved carts / wishlists / search history over from the pre-rebrand keys
// before any store reads them.
migrateLegacyStorage();

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ block: "start" });
      });

      return;
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname, search, hash]);

  return null;
}

function SessionBootstrap() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    initializeAuth?.();

    const handleUnauthorized = () => logout?.();

    window.addEventListener("velzora:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("velzora:unauthorized", handleUnauthorized);
    };
  }, [initializeAuth, logout]);

  return null;
}

/**
 * Global chrome that used to wrap <Routes /> in the Vite app. In the Next.js
 * App Router the matched page arrives as `children`.
 */
function AppShell({ children }) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />

      <LanguageProvider>
        <SessionBootstrap />
        <ScrollToTop />
        <RouteProgressBar />
        <Header />
        <WishlistToastManager />
        <AuthRequiredModal />

        <PageTransition>{children}</PageTransition>

        <Footer />
        <MobileBottomNav />
      </LanguageProvider>
    </>
  );
}

export default AppShell;
