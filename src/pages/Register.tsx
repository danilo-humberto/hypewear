import Forms from "@/components/auth/Forms";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/theme-provider";
import { Link } from "react-router-dom";

const Register = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-row-reverse">
      <figure className="flex-2 max-h-screen overflow-hidden hidden lg:block">
        <img
          src="/casal-street.jpg"
          alt="imagem de casal se abraçando com roupas casuais"
          className="object-cover h-[110%] brightness-75 scale-x-[-1]"
        />
      </figure>
      <div className="w-full h-screen flex flex-col items-center justify-center gap-2 p-4 flex-1">
        <div className="flex flex-col items-center justify-center p-4 rounded-sm w-full">
          <Link to={"/"}>
            <img
              src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"}
              alt="logo da HypeWear"
              className="w-20 h-17"
            />
          </Link>
          <div className="grid place-items-center">
            <h2 className="font-bold text-xl">Bem-vindo a HypeWear</h2>
            <p className="text-muted-foreground text-xs">
              Preencha os campos abaixo para criar a sua conta
            </p>
          </div>
          <Forms />
          <Separator className="my-3 max-w-sm" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground md:text-xs">
              Já possui uma conta?
            </p>
            <Link
              to={"/auth/login"}
              className="text-sm text-blue-400 md:text-xs hover:underline"
            >
              Entre agora!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
