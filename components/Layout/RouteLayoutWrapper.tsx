"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import { ensureDummyUser, getCurrentUser } from "@/utils/auth/storage";

const AUTH_ROUTES = ["/login"];

export default function RouteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthRoute = useMemo(() => {
    if (!pathname) {
      return false;
    }

    return AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  }, [pathname]);

  useEffect(() => {
    ensureDummyUser();
    const loggedInUser = getCurrentUser();

    if (isAuthRoute) {
      if (loggedInUser) {
        router.replace("/dashboard");
      }
      return;
    }

    if (!loggedInUser) {
      router.replace("/login");
    }
  }, [isAuthRoute, pathname, router]);

  const hasLoggedInUser = Boolean(getCurrentUser());

  if (isAuthRoute) {
    if (hasLoggedInUser) {
      return null;
    }

    return <>{children}</>;
  }

  if (!hasLoggedInUser) {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
