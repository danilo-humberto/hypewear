import { authEvents } from "@/utils/authEvents";
import { removeClientData } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const SessionExpiredModal = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = authEvents.onSessionExpired(() => {
      if (!location.pathname.startsWith("/auth")) {
        setOpen(true);
      }

      removeClientData("client");
    });

    return () => {
      unsubscribe();
    };
  }, [location.pathname]);

  const handleConfirm = () => {
    setOpen(false);
    navigate("/auth/login");
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sessão expirada</AlertDialogTitle>
          <AlertDialogDescription>
            Por segurança, seu tempo de acesso foi encerrado. Faça login
            novamente para continuar usando a HypeWear.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>
            Fazer login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionExpiredModal;
