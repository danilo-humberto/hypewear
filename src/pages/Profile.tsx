import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Star, Trash2 } from "lucide-react";
import { useState } from "react";

interface Address {
  id: number;
  street: string;
  number: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}

interface Order {
  id: number;
  date: string;
  total: string;
  status: "Entregue" | "Em andamento" | "Cancelado";
}

const Profile = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      street: "Rua das Flores",
      number: "123",
      city: "São Paulo",
      state: "SP",
      zip: "01000-000",
      isDefault: true,
    },
  ]);

  const [orders] = useState<Order[]>([
    { id: 1001, date: "15/10/2025", total: "R$ 249,90", status: "Entregue" },
    {
      id: 1002,
      date: "20/10/2025",
      total: "R$ 159,90",
      status: "Em andamento",
    },
  ]);

  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    street: "",
    number: "",
    city: "",
    state: "",
    zip: "",
  });

  const addAddress = () => {
    setAddresses((prev) => [
      ...prev,
      { id: Date.now(), ...newAddress, isDefault: false },
    ]);
    setNewAddress({ street: "", number: "", city: "", state: "", zip: "" });
  };

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefault = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const user = {
    name: "Leandro Silva",
    email: "leandro@email.com",
  };

  return (
    <div className="flex justify-center min-h-[90vh] mt-20 mx-auto md:w-[60%] lg:w-[90%] py-4 px-2 gap-2 flex-col md:flex-row">
      <div className="w-full flex flex-col">
        <Card className="w-full shadow-md border border-border/50">
          <CardHeader className="flex flex-col items-center text-center">
            <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full flex items-center gap-2 justify-center">
                  <Edit size={18} />
                  Editar perfil
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Perfil</DialogTitle>
                </DialogHeader>
                <div className="grid gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name">Nome</label>
                    <input
                      id="name"
                      type="text"
                      value={user.name}
                      className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                    />
                  </div>
                  <Button>Salvar</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Separator />

            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Meus Endereços</h2>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="border p-3 rounded-md flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {address.street}, {address.number}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city} - {address.state} | CEP: {address.zip}
                    </p>
                    {address.isDefault && (
                      <span className="text-xs text-green-600 font-medium">
                        🌟 Endereço padrão
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDefault(address.id)}
                    >
                      <Star
                        size={18}
                        className={
                          address.isDefault
                            ? "fill-yellow-400 text-yellow-400"
                            : ""
                        }
                      />
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Edit size={18} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Endereço</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                              <label>Rua</label>
                              <input
                                type="text"
                                value={address.street}
                                className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label>Número</label>
                              <input
                                type="text"
                                value={address.number}
                                className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                              <label>Cidade</label>
                              <input
                                type="text"
                                value={address.city}
                                className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label>Estado</label>
                              <input
                                type="text"
                                value={address.state}
                                className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label>CEP</label>
                            <input
                              type="text"
                              value={address.zip}
                              className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                            />
                          </div>
                          <Button>Salvar</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-2">
                    Adicionar novo endereço
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo endereço</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="street"
                          className="text-base md:text-sm"
                        >
                          Rua
                        </label>
                        <input
                          type="text"
                          id="street"
                          value={newAddress.street}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              street: e.target.value,
                            })
                          }
                          className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="number"
                          className="text-base md:text-sm"
                        >
                          Número
                        </label>
                        <input
                          type="text"
                          id="number"
                          value={newAddress.number}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              number: e.target.value,
                            })
                          }
                          className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="city" className="text-base md:text-sm">
                          Cidade
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              city: e.target.value,
                            })
                          }
                          className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="state" className="text-base md:text-sm">
                          Estado
                        </label>
                        <input
                          type="text"
                          id="state"
                          value={newAddress.state}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              state: e.target.value,
                            })
                          }
                          className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="zip" className="text-base md:text-sm">
                        CEP
                      </label>
                      <input
                        type="text"
                        id="zip"
                        value={newAddress.zip}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, zip: e.target.value })
                        }
                        className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
                      />
                    </div>

                    <Button onClick={addAddress}>Salvar endereço</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

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
                    Data: {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                  <p
                    className={`text-sm ${
                      order.status === "Entregue"
                        ? "text-green-600"
                        : order.status === "Cancelado"
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
