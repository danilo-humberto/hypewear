import {
  ChevronsUpDown,
  CircleUserRound,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Cart from "./Cart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getClientData } from "@/utils/storage";
import { logout } from "@/api/auth.endpoint";
import { toast } from "sonner";

const IconsDesktop = () => {
  const client = getClientData("client");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success("Você saiu com sucesso!");
    if (pathname !== "/") {
      navigate("/");
    } else {
      window.location.reload();
    }
  };
  return (
    <div className="hidden lg:flex items-center gap-2 absolute right-18">
      <ModeToggle />
      <Cart />
      <div className="flex items-center gap-1 cursor-pointer p-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="flex-row-reverse gap-4">
              <div className="flex items-center gap-2 flex-row-reverse">
                <CircleUserRound />
                {client?.access_token ? (
                  <span>{client?.client.name}</span>
                ) : (
                  <span>Conta</span>
                )}
              </div>
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mr-12">
            <Link
              to={"/profile"}
              className={`flex items-center cursor-pointer gap-2 text-foreground/70 hover:bg-accent transition-all duration-300 px-2 py-3 rounded-sm lg:text-sm
                ${!client?.access_token && "pointer-events-none opacity-50"}`}
            >
              <User size={20} />
              <span>Perfil</span>
            </Link>
            {client?.access_token ? (
              <div
                className="flex items-center cursor-pointer gap-2 text-foreground/70 hover:bg-accent transition-all duration-300 px-2 py-3 rounded-sm lg:text-sm"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span>Sair</span>
              </div>
            ) : (
              <Link
                to={"/auth/login"}
                className="flex items-center cursor-pointer gap-2 text-foreground/70 hover:bg-accent transition-all duration-300 px-2 py-3 rounded-sm lg:text-sm"
              >
                <LogIn size={20} />
                <span>Entrar</span>
              </Link>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default IconsDesktop;
