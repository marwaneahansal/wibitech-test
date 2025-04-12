import logo from "@/assets/Logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Navbar = () => {
  return (
    <header className="py-4 flex items-center justify-between">
      <div className="max-w-20 h-12">
        <img src={logo} alt="Taski Logo" className="h-full w-full" />
      </div>

      <div className="flex items-center gap-x-2">
        <p className="font-semibold">Admin</p>
        <Avatar onClick={() => console.log("logout")} className="cursor-pointer size-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
