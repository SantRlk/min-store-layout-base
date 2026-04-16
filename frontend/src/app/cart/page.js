"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <nav className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
            min store
          </h1>
          <div className="flex gap-4">
            <a href="/products" className="hover:underline">Produtos</a>
            <a href="/cart" className="hover:underline">Carrinho</a>
            <a href="/login" className="hover:underline">Login</a>
          </div>
        </nav>

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6">Carrinho ({cart.length} itens)</h2>

          {cart.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-slate-500 mb-4">Seu carrinho está vazio</p>
                <Button onClick={() => router.push("/products")}>Ir para Produtos</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4 flex gap-4 items-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      ) : (
                        <div className="w-20 h-20 bg-slate-200 rounded flex items-center justify-center">-</div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-sm text-slate-500">R$ {Number(item.price).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2 border rounded p-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-700">
                        Remover
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between border-t pt-4">
                    <span>Total:</span>
                    <span className="font-bold">R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button onClick={() => router.push("/checkout")} className="w-full">
                    Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
