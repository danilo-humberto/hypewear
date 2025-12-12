import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProfileData from "@/components/profile/ProfileData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/types/order";
import { useClientMe, useUpdateClientMe } from "@/hooks/queries/useClient";
import {
  useAddAddressMe,
  useDeleteAddressMe,
  useSetDefaultAddressMe,
} from "@/hooks/queries/useAdress";
import { toast } from "sonner";
import { getClientData } from "@/utils/storage";
import { getOrder } from "@/api/orders.endpoint";
import { PaymentDialog } from "@/components/header/PaymentDialog";
import type { Payment } from "@/types/payments";
import { PaymentReviewDialog } from "@/components/header/PaymentReviewDialog";

const Profile = () => {
  const { data: user, isLoading } = useClientMe();
  const updateProfile = useUpdateClientMe();

  const addAddress = useAddAddressMe();
  const deleteAddress = useDeleteAddressMe();
  const setDefault = useSetDefaultAddressMe();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

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

  const handleOpenOrder = async (orderId: string) => {
    const token = getClientData("client")?.access_token;
    if (!token) {
      toast.error("Você precisa estar logado para ver os detalhes do pedido.");
      return;
    }

    const fullOrder = await getOrder(orderId, token);
    if (!fullOrder) return toast.error("Pedido não encontrado.");

    setSelectedOrder(fullOrder);

    if (
      fullOrder.status === "AGUARDANDO_PAGAMENTO" ||
      (fullOrder.payments && fullOrder.payments.id)
    ) {
      setSelectedPayment(fullOrder.payments);
      setOpenReviewDialog(true);
      return;
    }

    setOpenPaymentDialog(true);
  };

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
                <button
                  key={order.id}
                  onClick={() => handleOpenOrder(order.id)}
                  className="border p-3 gap-2 rounded-md flex justify-between items-center cursor-pointer"
                  disabled={
                    order.status === "CANCELADO" || order.status === "PAGO"
                  }
                >
                  <div className="text-left">
                    <p className="font-medium">Pedido #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Data:{" "}
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
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
              ))
          )}
        </CardContent>
      </Card>
      {openPaymentDialog && selectedOrder && (
        <PaymentDialog
          order={selectedOrder}
          onOpenChange={(v) => setOpenPaymentDialog(v)}
          open={openPaymentDialog}
        />
      )}
      {selectedOrder && selectedPayment && (
        <PaymentReviewDialog
          open={openReviewDialog}
          onOpenChange={setOpenReviewDialog}
          order={selectedOrder}
          paymentMethod={selectedPayment.method}
          payment={selectedPayment}
          onPaymentDialogChange={setOpenPaymentDialog}
        />
      )}
    </div>
  );
};

export default Profile;
