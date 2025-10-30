import { Loader2 } from "lucide-react";
import { useState } from "react";
import { getClientData } from "@/utils/storage";
import ProfileData from "@/components/profile/ProfileData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClient, useUpdateClient } from "@/hooks/queries/useClient";
import {
  useGetAddresses,
  useAddAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/hooks/queries/useAdresss";
import { useGetOrders } from "@/hooks/queries/useOrders";
import { useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import type { Order } from "@/types/Order";

const Profile = () => {
  const client = getClientData("client");
  const clientId = client.client.id;

  const { data: user, isLoading } = useClient(clientId);
  const { data: addresses = [] } = useGetAddresses(clientId);
  const { data: orders = [] } = useGetOrders(clientId);

  const updateProfile = useUpdateClient(clientId);
  const addAddress = useAddAddress(clientId);
  const deleteAddress = useDeleteAddress(clientId);
  const setDefault = useSetDefaultAddress(clientId);

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

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        numberPhone: user.numberPhone || "",
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const handleUpdateProfile = async () => {
    await updateProfile.mutateAsync(profileData);
    setIsProfileModalOpen(false);
  };

  const handleAddAddress = async () => {
    await addAddress.mutateAsync({
      ...newAddress,
      clientId,
      isDefault: false,
    });
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
  };

  return (
    <div className="flex justify-center min-h-[90vh] mt-20 mx-auto md:w-[60%] lg:w-[90%] py-4 gap-2 flex-col md:flex-row">
      <ProfileData
        user={user}
        addresses={addresses || []}
        profileData={profileData}
        setProfileData={setProfileData}
        isProfileModalOpen={isProfileModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
        handleUpdateProfile={handleUpdateProfile}
        deleteAddress={(id) => deleteAddress.mutate(id)}
        setDefault={(id) => setDefault.mutate(id)}
        newAddress={newAddress}
        setNewAddress={setNewAddress}
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        addAddress={handleAddAddress}
      />
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
            orders.map((order: Order) => (
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
