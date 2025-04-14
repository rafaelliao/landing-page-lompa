'use client';

import { FloatingProducts } from "@/components/floating-products";
import { CenterCard } from "@/components/center-card";
import { ReferenceCard } from "@/components/reference-card";
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
      className="min-h-screen relative"
      style={{ background: 'linear-gradient(145deg, #160E25 0%, #221931 50%, #46285c 100%)' }}
    >
      {/* Botão do menu móvel */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 left-6 z-50 text-white/90 hover:text-white transition-colors md:hidden"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Menu móvel */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-[#160E25] z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="flex flex-col gap-6 pt-24 px-6">
          <NavigationLinks />
        </div>
      </div>

      {/* Links de navegação desktop */}
      <div className="fixed top-6 right-0 z-50 hidden md:flex gap-6 pr-24">
        <NavigationLinks />
      </div>

      <div className="relative h-screen w-full">
        <div className="absolute inset-0 z-10">
          <CenterCard />
        </div>
        <div className="absolute inset-0 z-0">
          <FloatingProducts />
        </div>
      </div>
      <div className="relative z-30">
        <div className="h-[200vh]"></div>
      </div>
      <ReferenceCard />
    </main>
  );
}
