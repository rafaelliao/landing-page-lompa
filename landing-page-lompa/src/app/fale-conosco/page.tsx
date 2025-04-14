"use client";

import { useState } from "react";
import Link from "next/link";

export default function FaleConosco() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-[#351B56] text-white">
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
            <label htmlFor="nome" className="block font-nunito mb-2">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none font-nunito"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block font-nunito mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none font-nunito"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="mensagem" className="block font-nunito mb-2">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              value={formData.mensagem}
              onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none font-nunito h-32"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-nunito transition-colors"
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </main>
  );
} 