import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Navigation = () => {
  return (
    <NavigationMenu className="absolute top-0 mt-2 w-screen hidden lg:block">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Latest Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Streetwear
                </p>
                <NavigationMenuLink asChild>
                  <a href="/collection/spring">Spring 2025</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/collection/fall">Fall Trends</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Top Picks
                </p>
                <NavigationMenuLink asChild>
                  <a href="/best-sellers">Best Sellers</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/editor-choice">Editor's Choice</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Acessórios
                </p>
                <NavigationMenuLink asChild>
                  <a href="/acessorios/bolsas">Bolsas</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/acessorios/joias">Joias</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Looks
                </p>
                <NavigationMenuLink asChild>
                  <a href="/looks/inspiracoes">Inspirações</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/looks/combos">Combos</a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Best</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Masculino
                </p>
                <NavigationMenuLink asChild>
                  <a href="/style/masculino/t-shirts">T-Shirts</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/style/masculino/jaquetas">Jaquetas</a>
                </NavigationMenuLink>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Feminino
                </p>
                <NavigationMenuLink asChild>
                  <a href="/style/feminino/tops">Tops</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/style/feminino/casacos">Casacos</a>
                </NavigationMenuLink>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Unissex
                </p>
                <NavigationMenuLink asChild>
                  <a href="/style/unissex">Ver todos</a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Style</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Casual
                </p>
                <NavigationMenuLink asChild>
                  <a href="/style/casual-urbano">Casual Urbano</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/style/minimalista">Minimalista</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Esportivo
                </p>
                <NavigationMenuLink asChild>
                  <a href="/style/athleisure">Athleisure</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/style/techwear">Techwear</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Retrô
                </p>
                <NavigationMenuLink asChild>
                  <a href="/style/vintage">Vintage</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/style/anos-90">Anos 90</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Outros
                </p>
                <NavigationMenuLink asChild>
                  <a href="/style/street-art">Street Art</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/style/high-fashion">High Fashion</a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Men</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Roupas
                </p>
                <NavigationMenuLink asChild>
                  <a href="/men/camisetas">Camisetas</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/men/calcas">Calças</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Acessórios
                </p>
                <NavigationMenuLink asChild>
                  <a href="/men/relogios">Relógios</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/men/oculos">Óculos de Sol</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Calçados
                </p>
                <NavigationMenuLink asChild>
                  <a href="/men/tenis">Tênis</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/men/botas">Botas</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Promoções
                </p>
                <NavigationMenuLink asChild>
                  <a href="/men/sale">Descontos Especiais</a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Woman</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Roupas
                </p>
                <NavigationMenuLink asChild>
                  <a href="/woman/vestidos">Vestidos</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/woman/saias">Saias</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Acessórios
                </p>
                <NavigationMenuLink asChild>
                  <a href="/woman/joias">Joias</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/woman/bolsas">Bolsas</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Calçados
                </p>
                <NavigationMenuLink asChild>
                  <a href="/woman/sneakers">Tênis</a>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <a href="/woman/sandalias">Sandálias</a>
                </NavigationMenuLink>
              </div>
              <div className="col-span-1">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Novidades
                </p>
                <NavigationMenuLink asChild>
                  <a href="/woman/new">Novas Coleções</a>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
