import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarArrowUp, Edit, Mail, Phone, Star, Trash2 } from "lucide-react";
import React from "react";
import { format } from "date-fns";

import type { Address, User } from "@/types/Profile";

interface ProfileDataProps {
  user: User;
  addresses: Address[];
  profileData: { name: string; email: string; numberPhone: string };
  setProfileData: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; numberPhone: string }>
  >;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateProfile: () => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
  newAddress: {
    logradouro: string;
    numero: string;
    cidade: string;
    estado: string;
    cep: string;
    bairro: string;
    complemento: string;
  };
  setNewAddress: React.Dispatch<
    React.SetStateAction<{
      logradouro: string;
      numero: string;
      cidade: string;
      estado: string;
      cep: string;
      bairro: string;
      complemento: string;
    }>
  >;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addAddress: () => void;
}

const ProfileData: React.FC<ProfileDataProps> = ({
  user,
  addresses,
  profileData,
  setProfileData,
  isProfileModalOpen,
  setIsProfileModalOpen,
  handleUpdateProfile,
  deleteAddress,
  setDefault,
  newAddress,
  setNewAddress,
  isAddressModalOpen,
  setIsAddressModalOpen,
  addAddress,
}) => {
  return (
    <Card className="w-full flex flex-col shadow-md border border-border/50">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Phone size={16} /> {user.numberPhone}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <CalendarArrowUp size={16} />{" "}
              {format(user.createdAt, "dd/MM/yyyy")}
            </p>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Mail size={16} /> {user.email}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full flex items-center gap-2 justify-center">
              <Edit size={18} /> Editar perfil
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Editar Perfil</DialogTitle>
              <DialogDescription className="text-center">
                Atualize suas informações pessoais.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-1">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    email: e.target.value,
                  })
                }
                className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
              />

              <label htmlFor="numberPhone">Numero</label>
              <input
                id="numberPhone"
                type="text"
                value={profileData.numberPhone}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    numberPhone: e.target.value,
                  })
                }
                className="border border-input rounded-sm p-3 text-sm outline-border bg-background/30"
              />
              <Button className="mt-2" onClick={handleUpdateProfile}>
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Separator />

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Meus Endereços</h2>
          {addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum endereço cadastrado. Adicione um novo abaixo.
            </p>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="border p-3 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {address.logradouro}, {address.numero}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.cidade} - {address.estado} | CEP: {address.cep}
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
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteAddress(address.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))
          )}

          <Dialog
            open={isAddressModalOpen}
            onOpenChange={setIsAddressModalOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full mt-2">Adicionar novo endereço</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo endereço</DialogTitle>
                <DialogDescription>
                  Preencha os campos para salvar um novo endereço.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label>Rua</label>
                    <input
                      value={newAddress.logradouro}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          logradouro: e.target.value,
                        })
                      }
                      className="border border-input rounded-sm p-3 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Número</label>
                    <input
                      value={newAddress.numero}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          numero: e.target.value,
                        })
                      }
                      className="border border-input rounded-sm p-3 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label>Cidade</label>
                    <input
                      value={newAddress.cidade}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          cidade: e.target.value,
                        })
                      }
                      className="border border-input rounded-sm p-3 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Estado</label>
                    <input
                      value={newAddress.estado}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          estado: e.target.value,
                        })
                      }
                      className="border border-input rounded-sm p-3 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label>CEP</label>
                  <input
                    value={newAddress.cep}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, cep: e.target.value })
                    }
                    className="border border-input rounded-sm p-3 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Complemento</label>
                  <input
                    value={newAddress.complemento}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        complemento: e.target.value,
                      })
                    }
                    className="border border-input rounded-sm p-3 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="bairro">Bairro</label>
                  <input
                    id="bairro"
                    type="text"
                    value={newAddress.bairro}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        bairro: e.target.value,
                      })
                    }
                    className="border border-input rounded-sm p-3 text-sm"
                  />
                </div>
                <Button onClick={addAddress}>Salvar endereço</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileData;
