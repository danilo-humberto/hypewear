import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const Forms = () => {
  const { pathname } = useLocation();
  return (
    <form className="mt-3 w-full max-w-sm flex flex-col gap-4">
      {pathname === "/auth/register" && (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-base md:text-sm">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="login" className="text-base md:text-sm">
              Login
            </label>
            <input
              type="text"
              name="login"
              id="login"
              className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30"
            />
          </div>
        </>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-base md:text-sm">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-input border rounded-sm p-3 text-sm outline-border bg-background/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-base md:text-sm">
          Senha
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
        />
      </div>

      <Button size="lg">Entrar</Button>
    </form>
  );
};

export default Forms;
