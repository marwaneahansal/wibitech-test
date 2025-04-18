import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import logo from "@/assets/Logo.svg";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "@/hooks/queries/auth";
import { useAuth } from "@/hooks/use-auth";

export const Login = () => {
  const { isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword((oldValue) => !oldValue);
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutation } = useLoginMutation();

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-svh flex items-center justify-center px-4 md:px-24">
      <Card className="w-full md:w-[60%] lg:w-[30%]">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <CardHeader>
              <div className="flex items-center justify-center mb-12">
                <img src={logo} alt="Taski Logo" />
              </div>
              <CardTitle className="text-center text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent className="grid w-full items-center gap-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="************"
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                          {...field}
                          aria-invalid={!!form.formState.errors.password}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" size={"lg"}>
                {mutation.isPending ? "Loading..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};
