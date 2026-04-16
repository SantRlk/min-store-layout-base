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
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/products");
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data = await response.json();
        setProducts(data.slice(0, 3));
      } catch (err) {
        setError(err.message);
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div>
          <p className="text-2xl font-bold tracking-tight">min store</p>
          <span className="text-sm text-slate-500">Minimalist clothes store</span>
        </div>
        <nav className="flex items-center gap-3">
          <a href="/products" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Produtos
          </a>
          <a href="/cart" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Carrinho
          </a>
          <a href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Login
          </a>
          <a href="/register" className="rounded-md bg-slate-900 px-3 py-1 text-sm font-medium text-white hover:bg-slate-700">
            Cadastro
          </a>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bem-vindo ao seu e-commerce minimalista</h1>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div 
              className="rounded-xl border border-slate-200 p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push("/products")}
            >
              <h3 className="font-semibold text-slate-900">Produtos</h3>
              <p className="text-sm text-slate-500">Veja nosso catálogo completo aqui.</p>
            </div>
            <div 
              className="rounded-xl border border-slate-200 p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push("/cart")}
            >
              <h3 className="font-semibold text-slate-900">Carrinho</h3>
              <p className="text-sm text-slate-500">Veja os itens que você adicionou.</p>
            </div>
            <div 
              className="rounded-xl border border-slate-200 p-4 text-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push("/checkout")}
            >
              <h3 className="font-semibold text-slate-900">Checkout</h3>
              <p className="text-sm text-slate-500">Complete seu pedido aqui.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Produtos em destaque</h2>
          
          {loading && (
            <div className="mt-6 text-center text-slate-500">
              Carregando produtos...
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
              Erro ao carregar produtos: {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="mt-6 text-center text-slate-500">
              Nenhum produto encontrado.
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-48 w-full rounded-md object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div
                    className="h-48 w-full rounded-md bg-slate-200 flex items-center justify-center"
                    style={{
                      display: product.imageUrl ? 'none' : 'flex',
                    }}
                  >
                    <span className="text-sm text-slate-500">Sem imagem</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{product.description || "Sem descrição"}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-slate-900">R$ {Number(product.price).toFixed(2)}</span>
                    <Button size="sm" className="h-8 px-3">
                      Ver
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Button 
              onClick={() => router.push("/products")}
              className="px-8 py-2"
            >
              Ver todos os produtos
            </Button>
          </div>
        </section>

       
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-500">
        min store - projeto fessor violin :))) 
      </footer>
    </div>
  );
}
