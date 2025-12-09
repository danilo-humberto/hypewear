import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProfileData from "@/components/profile/ProfileData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Order } from "@/types/order";
import OrderInformation from "@/components/profile/OrderInformation";
import { useClientMe, useUpdateClientMe } from "@/hooks/queries/useClient";
import {
  useAddAddressMe,
  useDeleteAddressMe,
  useSetDefaultAddressMe,
} from "@/hooks/queries/useAdress";

const Profile = () => {
  const { data: user, isLoading } = useClientMe();
  const updateProfile = useUpdateClientMe();

  const addAddress = useAddAddressMe();
  const deleteAddress = useDeleteAddressMe();
  const setDefault = useSetDefaultAddressMe();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
    const payload = {
      ...newAddress,
      clientId: user.id,
      isDefault: false,
    };

    await addAddress.mutateAsync(payload);
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
    <div className="flex justify-center min-h-[90vh] mt-20 mx-auto md:w-[60%] lg:w-[90%] p-2 gap-2 flex-col md:flex-row">
      <ProfileData
        client={user}
        addresses={user.addresses}
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
      <Dialog>
        <Card className="w-full shadow-md border border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Histórico de Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Separator />
            {user.orders?.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">
                Você ainda não possui pedidos.
              </p>
            ) : (
              [...user.orders]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((order: Order) => (
                  <DialogTrigger asChild key={order.id}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="border p-3 gap-2 rounded-md flex justify-between items-center cursor-pointer"
                    >
                      <div className="text-left">
                        <p className="font-medium">Pedido #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Data:{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(order.total)}
                        </p>
                        <p
                          className={`text-sm wrap-anywhere ${
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
                    </button>
                  </DialogTrigger>
                ))
            )}
          </CardContent>
        </Card>
        <DialogContent className="w-full lg:min-w-lg">
          <DialogTitle>Detalhes do Pedido</DialogTitle>
          <OrderInformation order={selectedOrder} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
