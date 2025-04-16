"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      setShow(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!mounted || !show) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-[#351B56]/95 backdrop-blur-sm p-4 z-[999999]"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(53, 27, 86, 0.95)',
        backdropFilter: 'blur(4px)',
        padding: '1rem',
        zIndex: 999999
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white text-sm md:text-base">
          Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
          <a href="/politica-de-privacidade" className="text-[#E321FF] hover:underline">
            política de privacidade
          </a>
          .
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-white/90 hover:text-white text-sm md:text-base"
          >
            Não Aceitar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-[#E321FF] text-white rounded-lg hover:bg-[#E321FF]/90 text-sm md:text-base"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
} 