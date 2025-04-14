"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function CenterCard() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getScale = () => {
    const progress = Math.min(scrollY * 0.001, 0.2); // 20% de aumento máximo
    return 1 + progress;
  };

  const getOpacity = () => {
    const fadeStart = 0; // Começa a desaparecer desde a primeira rolagem
    const fadeEnd = 300; // Desaparece completamente na segunda rolagem
    if (scrollY < fadeStart) return 1;
    if (scrollY > fadeEnd) return 0;
    return 1 - ((scrollY - fadeStart) / (fadeEnd - fadeStart));
  };

  return (
    <>
      <div
        ref={cardRef}
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          transform: isMounted 
            ? `translate(-50%, -50%) scale(${getScale()})` 
            : "translate(-50%, -50%) scale(1)",
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Borda externa - visível apenas em desktop */}
        <div className="relative w-[370px] h-[650px] bg-[#351B56]/10 rounded-[60px] backdrop-blur-sm hidden md:block" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[620px] bg-[#351B56]/15 rounded-[55px] backdrop-blur-md shadow-[0_0_5px_rgba(227,33,255,0.05)]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[600px] bg-[#351B56]/30 rounded-[50px] backdrop-blur-lg flex flex-col items-center justify-center p-8 shadow-lg">
          <div className="absolute inset-0 rounded-[50px] bg-[#46285c]/30" />
          <div className="absolute inset-0 rounded-[50px] shadow-[0_0_20px_rgba(227,33,255,0.18)] border border-[#E321FF]/30 animate-pulse" />
          <div className="absolute inset-[1px] rounded-[49px] shadow-[inset_0_0_10px_rgba(227,33,255,0.1)]" />
        </div>
      </div>

      <div 
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center space-y-10"
        style={{
          transform: isMounted 
            ? `translate(-50%, calc(-50% - ${Math.min(scrollY * 5, 600)}px))` 
            : "translate(-50%, -50%)",
          opacity: isMounted ? getOpacity() : 1,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
        }}
      >
        <div className="flex justify-center" style={{ opacity: 0.9 }}>
          <img
            src="/images/lompa-logo.svg"
            alt="Lompa Logo"
            width={90}
            height={90}
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
          O marketplace <br />
          do futuro, mais <br />
          social, acessível <br />
          e interativo!
        </h2>

        <Link
          href="/download"
          className="inline-flex items-center justify-center rounded-full bg-[#E321FF]/20 backdrop-blur-sm px-8 py-4 text-base font-medium text-white border border-[#E321FF]/30 shadow-sm hover:bg-[#E321FF]/30 transition-all animate-button-pulse"
        >
          Baixe agora
        </Link>

        {/* Ícones das lojas */}
        <div className="flex gap-4 justify-center items-center w-full">
          <a href="#" className="hover:opacity-80 transition-opacity w-auto">
            <img
              src="/images/App Store_SVG.svg"
              alt="App Store"
              className="w-[132px] h-auto max-w-none"
              style={{
                minWidth: '132px',
                width: '132px',
              }}
            />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity w-auto">
            <img
              src="/images/Google Play_SVG.svg"
              alt="Play Store"
              className="w-[132px] h-auto max-w-none"
              style={{
                minWidth: '132px',
                width: '132px',
              }}
            />
          </a>
        </div>
      </div>
    </>
  );
}
