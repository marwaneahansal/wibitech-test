import { LoadingSpinner } from "@/components/loading-spinner";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

export const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-svh px-4 md:px-12 lg:px-24 py-4 pb-12">
      <Navbar />
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};
