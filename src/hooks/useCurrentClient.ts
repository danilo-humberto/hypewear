import { getClientData } from "@/utils/storage";
import { useSyncExternalStore } from "react";

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

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
}

export function useCurrentClient() {
  const stored = useSyncExternalStore(
    subscribe,
    readClientFromStorage,
    readClientFromStorage
  );

  const isAuthenticated = !!stored?.access_token;
  const role = stored?.client?.role || "USER";

  return {
    isAuthenticated,
    token: stored?.access_token || null,
    client: stored?.client || null,
    role,
  };
}
