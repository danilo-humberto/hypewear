import Forms from "@/components/auth/Forms";
import { useTheme } from "@/hooks/theme-provider";

const Login = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <img
        src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"}
        alt="logo da HypeWear"
        className="w-20 h-17"
      />
      <div className="grid place-items-center">
        <h2 className="font-bold text-xl">Bem-vindo de Volta</h2>
        <p className="text-muted-foreground text-xs">
          Insira seu e-mail e sua senha para continuar
        </p>
      </div>
      <Forms />
    </div>
  );
};

export default Login;
