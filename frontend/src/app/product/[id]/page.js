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
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/products`);
        if (!response.ok) {
          throw new Error("Erro ao buscar produto");
        }
        const data = await response.json();
        const productData = data.find((p) => p.id === parseInt(params.id));
        if (!productData) {
          throw new Error("Produto não encontrado");
        }
        setProduct(productData);
      } catch (err) {
        setError(err.message);
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-slate-700 hover:text-slate-900 w-fit"
        >
          ← Voltar
        </button>

        {loading && (
          <div className="text-center text-slate-500">
            Carregando produto...
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            Erro: {error}
          </div>
        )}

        {product && (
          <div className="grid gap-8 md:grid-cols-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full rounded-xl object-cover"
                />
              ) : (
                <div className="w-full h-96 rounded-xl bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-500">Sem imagem</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>
                <p className="mt-4 text-slate-600">{product.description}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">
                    R$ {Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-600">
                  Estoque disponível: <span className="font-semibold">{product.stock}</span>
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 py-6 text-lg"
                >
                  {product.stock === 0 ? "Fora de estoque" : "Adicionar ao carrinho"}
                </Button>
              </div>

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
