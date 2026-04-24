"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
            min store
          </h1>
          <div className="flex gap-4 text-sm">
            <a href="/products">Produtos</a>
            <a href="/cart">Carrinho</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Nossos Produtos</h2>

        {loading && <p className="text-center text-slate-500">Carregando...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
              <div className="p-0">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t" />
                ) : (
                  <div className="w-full h-48 bg-slate-200 flex items-center justify-center rounded-t text-sm text-slate-500">Sem imagem</div>
                )}
              </div>
              <CardContent className="p-4">
                <CardTitle className="text-base">{product.name}</CardTitle>
                <CardDescription className="mt-1">{product.description}</CardDescription>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold">R$ {Number(product.price).toFixed(2)}</span>
                  <Button size="sm">Ver</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
