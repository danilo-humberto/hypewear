import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { RegisterDto } from "@/types/auth";

interface FormsProps {
  handleLogin?: (e: React.FormEvent, email: string, password: string) => void;
  isPending?: boolean;
  handleRegister?: (e: React.FormEvent, credentials: RegisterDto) => void;
}

const Forms = ({ handleLogin, isPending, handleRegister }: FormsProps) => {
  const { pathname } = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="mt-3 w-full max-w-sm flex flex-col gap-4"
      onSubmit={(e) => {
        if (pathname === "/auth/login") {
          handleLogin && handleLogin(e, email, password);
        } else if (pathname === "/auth/register") {
          handleRegister && handleRegister(e, { name, email, password });
        }
      }}
    >
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button size="lg" disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : "Entrar"}
      </Button>
    </form>
  );
};

export default Forms;
