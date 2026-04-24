"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 3)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div>
          <p className="text-2xl font-bold">min store</p>
          <span className="text-sm text-slate-500">Minimalist store</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/products" className="text-slate-700">Produtos</a>
          <a href="/cart" className="text-slate-700">Carrinho</a>
          <a href="/login" className="text-slate-700">Login</a>
          <a href="/register" className="rounded-md bg-slate-900 px-3 py-1 text-white">Cadastro</a>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-12">
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm mb-8">
          <h1 className="text-3xl font-bold">Bem-vindo</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-4 text-center cursor-pointer" onClick={() => router.push("/products")}>
              <h3 className="font-semibold">Produtos</h3>
              <p className="text-sm text-slate-500 mt-1">Veja nosso catálogo</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 text-center cursor-pointer" onClick={() => router.push("/cart")}>
              <h3 className="font-semibold">Carrinho</h3>
              <p className="text-sm text-slate-500 mt-1">Seus itens</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 text-center cursor-pointer" onClick={() => router.push("/checkout")}>
              <h3 className="font-semibold">Checkout</h3>
              <p className="text-sm text-slate-500 mt-1">Complete seu pedido</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Destaque</h2>
          
          {loading && <p className="text-slate-500">Carregando...</p>}
          {error && <p className="text-red-600">Erro: {error}</p>}

          {!loading && !error && products.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-lg border border-slate-200 p-4 cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 rounded object-cover mb-3" />
                  )}
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{product.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold">R$ {Number(product.price).toFixed(2)}</span>
                    <Button size="sm">Ver</Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-500">
        min store - projeto fessor violin :)))
      </footer>
    </div>
  );
}
