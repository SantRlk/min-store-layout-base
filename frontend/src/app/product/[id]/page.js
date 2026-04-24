"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        const productData = data.find((p) => p.id === params.id);
        if (!productData) throw new Error("Produto não encontrado");
        setProduct(productData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
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

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <button onClick={() => router.back()} className="text-sm text-slate-700 mb-6">
          ← Voltar
        </button>

        {loading && <p className="text-slate-500">Carregando produto...</p>}
        {error && <p className="text-red-600">Erro: {error}</p>}

        {product && (
          <div className="grid gap-8 md:grid-cols-2 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <div>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full rounded object-cover" />
              ) : (
                <div className="w-full h-96 rounded bg-slate-200 flex items-center justify-center text-slate-500">Sem imagem</div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <p className="mt-4 text-slate-600">{product.description}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-3xl font-bold">R$ {Number(product.price).toFixed(2)}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600">Estoque: <span className="font-semibold">{product.stock}</span></p>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="py-6 text-base"
              >
                {product.stock === 0 ? "Fora de estoque" : "Adicionar ao carrinho"}
              </Button>

              {addedToCart && (
                <div className="rounded-lg bg-green-50 p-4 text-green-700">
                  ✓ Produto adicionado ao carrinho!
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-500">
        min store - projeto fessor violin :)))
      </footer>
    </div>
  );
}
