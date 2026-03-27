"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Camisa Minimalista",
    price: 79.9,
    description: "Algodão orgânico, corte relaxed, detalhe clean.",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQZ2VKGOUr3tOGTHxEZuwrNU3uCP130Rug8HDZS-q7q3xPuu8y1GYnnquppeFHdYwM0ibYtBb9ivDQ9RxkSTVDI2ilKazYI2wBqxHboow3uO7K0ttqaB9fIe1TtD4bMOatAFTZvnQ&usqp=CAc",
  },
  {
    id: 2,
    name: "Tênis Branco",
    price: 229.9,
    description: "Leve, solado macio e design atemporal.",
    image: "https://imgnike-a.akamaihd.net/768x768/02865652A2.jpg",
  },
  {
    id: 3,
    name: "Mochila Urbana",
    price: 159.9,
    description: "Compartimento para laptop, resistente à água.",
    image: "https://m.media-amazon.com/images/I/51YjweEpAnL._AC_SL1200_.jpg",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div>
          <p className="text-2xl font-bold tracking-tight">min store</p>
          <span className="text-sm text-slate-500">Minimalist clothes store</span>
        </div>
        <nav className="flex items-center gap-3">
          <a href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Home
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
            <div className="rounded-xl border border-slate-200 p-4 text-center">
              <h3 className="font-semibold text-slate-900">Produtos</h3>
              <p className="text-sm text-slate-500">Catálogo limpo para scan rápido.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 text-center">
              <h3 className="font-semibold text-slate-900">Carrinho</h3>
              <p className="text-sm text-slate-500">Resumo de itens em tempo real.</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 text-center">
              <h3 className="font-semibold text-slate-900">Checkout</h3>
              <p className="text-sm text-slate-500">Processo simples e claro.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Produtos em destaque</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full rounded-md object-cover"
                />
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-bold text-slate-900">R$ {product.price.toFixed(2)}</span>
                  <Button size="sm" className="h-8 px-3">
                    Ver
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

       
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-500">
        min store - projeto fessor violin :))) 
      </footer>
    </div>
  );
}
