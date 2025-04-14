'use client';

import { FloatingProducts } from "@/components/floating-products";
import { CenterCard } from "@/components/center-card";
import { ReferenceCard } from "@/components/reference-card";
import { ScrollIndicator } from "@/components/scroll-indicator";
import Link from "next/link";
import { FaWhatsapp, FaHeadset, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavigationLinks = () => (
    <>
      <Link 
        href="/fale-conosco" 
        className="text-white/90 hover:text-white transition-colors font-nunito text-lg flex items-center gap-2"
        onClick={() => setIsMenuOpen(false)}
      >
        <FaWhatsapp size={20} />
        Fale Conosco
      </Link>
      <span className="text-white/50 text-lg hidden md:block">|</span>
      <Link 
        href="/suporte" 
        className="text-white/90 hover:text-white transition-colors font-nunito text-lg flex items-center gap-2"
        onClick={() => setIsMenuOpen(false)}
      >
        <FaHeadset size={20} />
        Suporte
      </Link>
    </>
  );

  return (
    <main 
      className="min-h-screen relative overflow-x-hidden"
      style={{ 
        background: 'linear-gradient(145deg, #160E25 0%, #221931 50%, #46285c 100%)',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      {/* Teste de ambiente local - Turbo configurado corretamente */}
      {/* Botão do menu móvel */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="container-fluid px-4 md:px-8 flex justify-between items-center">
          {/* Menu para Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/90 hover:text-white transition-colors"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center gap-8 md:hidden">
              <NavigationLinks />
            </div>
          )}

          {/* Links de Navegação Desktop */}
          <div className="flex-1 hidden md:flex justify-end">
            <nav className="flex items-center gap-6">
              <NavigationLinks />
            </nav>
          </div>
        </div>
      </header>

      {/* Primeira seção - altura total da viewport */}
      <section className="relative min-h-screen">
        <FloatingProducts />
        <CenterCard />
        <ScrollIndicator />
      </section>

      {/* Segunda seção - para onde a página rola */}
      <section className="relative min-h-screen bg-opacity-50 flex items-center justify-center">
        <ReferenceCard />
      </section>

      {/* Espaço adicional para garantir a rolagem */}
      <div className="h-screen"></div>
    </main>
  );
}
