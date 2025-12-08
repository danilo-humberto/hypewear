import { getClientData } from "@/utils/storage";
import { useEffect, useState } from "react";

type StoredClient = {
  access_token: string;
  client: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
} | null;

function readClientFromStorage(): StoredClient {
  try {
    const raw = getClientData("client");
    if (!raw) return null;
    return typeof raw === "string"
      ? (JSON.parse(raw) as StoredClient)
      : (raw as StoredClient);
  } catch {
    return null;
  }
}

export function useCurrentClient() {
  const [stored, setStored] = useState<StoredClient>(() =>
    readClientFromStorage()
  );

  useEffect(() => {
    const handleStorage = () => {
      setStored(readClientFromStorage());
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  });

  const isAuthenticated = !!stored?.access_token;
  const role = stored?.client?.role || "USER";

  return {
    isAuthenticated,
    token: stored?.access_token || null,
    client: stored?.client || null,
    role,
  };
}
