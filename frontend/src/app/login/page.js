import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="mt-2 text-sm text-slate-500">Entre na sua conta para continuar.</p>

          <form className="mt-6 flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                placeholder="seu@email.com"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Senha
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </label>
            <Button type="button" className="mt-2 w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-4 text-sm text-slate-500">
            Não tem conta?{' '}
            <Link href="/register" className="font-medium text-slate-900 hover:text-slate-700">
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
