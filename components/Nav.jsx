"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logout } from "@/redux/authSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth); // Access user from Redux state
  const authRoutes = [
    "/authentication/login",
    "/authentication/admin/login",
    "/admin",
    "/authentication/admin/signup",
    "/authentication/admin/verify-email",
    "/authentication/signup",
    "/authentication/verify-email",
  ];
  const path = usePathname();

  // Check if we are on an authentication route
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Don't render Nav if we're on an authentication route
  if (isAuthRoute) return null;

  // Don't render anything until the session is checked
  if (loading) return null;

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        dispatch(logout()); // Dispatch logout action to clear user data from Redux store
        toast.success("Successfully logged out.");
        router.push("/authentication/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="py-4 px-5 sm:px-7 md:px-9 lg:px-11 xl:px-12 flex justify-between items-center">
      <div>🔐unlocKod</div>
      <div className="flex gap-8 justify-between items-center">
        <Link href={`/`} className="hover:text-gray-400">
          Home
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="hover:rounded-xl px-4 py-2 bg-violet-900 text-white hover:bg-violet-700"
          >
            Logout
          </button>
        ) : (
          <Link href={"/authentication/login"}>
            <button className="hover:rounded-lg px-4 py-2 bg-violet-900 text-white hover:bg-violet-700">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
