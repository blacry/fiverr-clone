"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole: "client" | "lifter";
}

export default function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }

    const checkRole = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        
        if (!data.user) {
          // User not created in our DB yet, redirect to onboarding
          router.push("/onboarding");
          return;
        }

        if (data.user.role !== allowedRole) {
          // Wrong role, redirect to correct dashboard
          if (data.user.role === "client") {
            router.push("/client/dashboard");
          } else {
            router.push("/lifter/dashboard");
          }
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Failed to check role", error);
      }
    };

    checkRole();
  }, [user, isLoaded, router, allowedRole]);

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}
