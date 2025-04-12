import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/Logo.svg";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router";

export const Login = () => {
  const isAuthenticated = true;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((oldValue) => !oldValue);
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-svh flex items-center justify-center px-24">
      <Card className="w-[30%]">
        <CardHeader>
          <div className="flex items-center justify-center mb-12">
            <img src={logo} alt="Taski Logo" />
          </div>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Your username" />
              </div>
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="************"
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                  />
                  <Button
                    variant={"link"}
                    type="button"
                    size={"icon"}
                    className="absolute top-1/2 -right-4 -translate-1/2"
                    onClick={togglePassword}
                  >
                    {showPassword ? (
                      <EyeClosedIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
