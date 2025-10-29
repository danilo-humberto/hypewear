import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import api from "../api/axios";
import ProfileData from "../components/profile/ProfileData";
import type { Address, Order, User } from "@/types/Profile";

const Profile = () => {
  const DEVELOPER_USER_ID = "76a4a29b-07e8-4bb0-89a4-2d094ac3b158";

  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    numberPhone: "",
  });
  const [newAddress, setNewAddress] = useState({
    logradouro: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: "",
    bairro: "",
    complemento: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/clients/${DEVELOPER_USER_ID}`);
        const userData = response.data;

        setUser(userData);
        setAddresses(userData.addresses || []);
        setOrders(userData.orders || []);
        setProfileData({
          name: userData.name,
          email: userData.email,
          numberPhone: userData.numberPhone || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [DEVELOPER_USER_ID]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      const response = await api.patch(`/clients/${user.id}`, profileData);
      setUser(response.data);
      setIsProfileModalOpen(false);
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
    }
  };

  const addAddress = async () => {
    const payload = {
      ...newAddress,
      clientId: DEVELOPER_USER_ID,
      isDefault: false,
    };

    try {
      const response = await api.post("/addresss", payload);
      setAddresses((prev) => [...prev, response.data]);

      setNewAddress({
        logradouro: "",
        numero: "",
        cidade: "",
        estado: "",
        cep: "",
        bairro: "",
        complemento: "",
      });
      setIsAddressModalOpen(false);
    } catch (err) {
      console.error("Erro ao adicionar endereço:", err);
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await api.delete(`/addresss/${id}`);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Erro ao deletar endereço:", err);
    }
  };

  const setDefault = async (id: string) => {
    try {
      await api.patch(`/addresss/${id}/default`);
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === id }))
      );
    } catch (err) {
      console.error("Erro ao definir endereço padrão:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-[90vh] mt-20 mx-auto md:w-[60%] lg:w-[90%] py-4 gap-2 flex-col md:flex-row">
      {user && (
        <ProfileData
          user={user}
          addresses={addresses}
          profileData={profileData}
          setProfileData={setProfileData}
          isProfileModalOpen={isProfileModalOpen}
          setIsProfileModalOpen={setIsProfileModalOpen}
          handleUpdateProfile={handleUpdateProfile}
          deleteAddress={deleteAddress}
          setDefault={setDefault}
          newAddress={newAddress}
          setNewAddress={setNewAddress}
          isAddressModalOpen={isAddressModalOpen}
          setIsAddressModalOpen={setIsAddressModalOpen}
          addAddress={addAddress}
        />
      )}

      <Card className="w-full shadow-md border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Histórico de Pedidos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Separator />
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Você ainda não possui pedidos.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border p-3 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">Pedido #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Data:{" "}
                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                  <p
                    className={`text-sm ${
                      order.status === "PAGO"
                        ? "text-green-600"
                        : order.status === "CANCELADO"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
