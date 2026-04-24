"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b p-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>min store</h1>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto p-6 text-center">
          <p className="text-slate-500 mb-4">Carrinho vazio</p>
          <Button onClick={() => router.push("/products")}>Ir para Produtos</Button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pedido realizado com sucesso!");
    clearCart();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>min store</h1>
          <div className="flex gap-4 text-sm">
            <a href="/products">Produtos</a>
            <a href="/cart">Carrinho</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        <div className="grid grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Nome" name="name" value={formData.name} onChange={handleChange} required />
                <Input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                <Input placeholder="Telefone" name="phone" value={formData.phone} onChange={handleChange} />
                <Input placeholder="Endereço" name="address" value={formData.address} onChange={handleChange} required />
              </CardContent>
            </Card>
            <Button type="submit" className="w-full">Confirmar Pedido</Button>
          </form>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 border-b pb-4 text-sm">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>R$ {(Number(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      alert("Pedido realizado com sucesso!");
      clearCart();
      router.push("/");
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <nav className="bg-white border-b p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
              min store
            </h1>
          </nav>
          <div className="p-6 text-center">
            <p className="text-slate-500 mb-4">Carrinho vazio</p>
            <Button onClick={() => router.push("/products")}>Ir para Produtos</Button>
          </div>
        </div>
      </div>
    );
  }

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
          </div>
        </nav>

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6">Checkout</h2>

          <div className="grid grid-cols-3 gap-6">
            <form onSubmit={handleSubmit} className="col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    placeholder="Telefone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Endereço"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processando..." : "Confirmar Pedido"}
              </Button>
            </form>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-h-48 overflow-y-auto space-y-2 border-b pb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>R$ {(Number(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
