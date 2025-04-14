"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function FaleConosco() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-[#351856] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Botão Voltar */}
        <Link
          href="/"
          className="inline-block mb-8 text-white/90 hover:text-white transition-colors font-nunito text-lg"
        >
          ← Voltar
        </Link>

        <h1 className="text-4xl font-nunito font-bold mb-8">Fale Conosco</h1>

        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-6">
            <label htmlFor="nome" className="block mb-2 text-lg">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full p-3 bg-white/10 rounded-lg text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 bg-white/10 rounded-lg text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="mensagem" className="block mb-2 text-lg">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              className="w-full p-3 bg-white/10 rounded-lg text-white min-h-[150px]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E321FF]/20 hover:bg-[#E321FF]/30 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </main>
  );
} 