import { Navbar } from "@/components/navbar";
import { Navigate } from "react-router";

export const ProtectedLayout = () => {
  const isAuthenticated = true;

  
  if (!isAuthenticated) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className="min-h-svh px-24 py-4">
      <Navbar />
    </div>
  )
}