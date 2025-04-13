import { Navbar } from "@/components/navbar";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

export const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-svh px-24 py-4">
      <Navbar />
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};
