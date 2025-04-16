"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  // Estado para controlar a visibilidade. Inicia como null para diferenciar do estado inicial 'false'.
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Indica que o componente montou no cliente
    try {
      const consent = localStorage.getItem("cookie-consent");
      console.log("Cookie Consent (on mount):", consent);
      // Só mostra o banner se não houver consentimento registrado
      if (!consent) {
        setIsVisible(true);
        console.log("Setting banner to visible");
      } else {
        setIsVisible(false); // Esconde se já houver consentimento
        console.log("Consent already exists, hiding banner");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setIsVisible(true); // Mostra o banner se houver erro ao acessar localStorage
    }
  }, []);

  const handleResponse = (consentValue: "accepted" | "declined") => {
    try {
      localStorage.setItem("cookie-consent", consentValue);
      console.log(`Consent set to: ${consentValue}`);
      setIsVisible(false);
    } catch (error) {
      console.error("Error setting localStorage:", error);
      // Mesmo com erro, esconde o banner para não bloquear a UI
      setIsVisible(false); 
    }
  };

  // Não renderiza nada no servidor ou antes da montagem inicial no cliente
  if (!mounted) {
      console.log("Component not mounted yet, rendering null");
      return null;
  }
  
  // Não renderiza se isVisible for false (após consentimento ou se já existia)
  if (isVisible === false) {
      console.log("isVisible is false, rendering null");
      return null;
  }

  // Renderiza o banner se isVisible for true
  console.log("Rendering Cookie Banner");
  return (
    <div 
      // Aumentado z-index e removido style inline desnecessário
      className="fixed bottom-0 left-0 right-0 bg-[#351B56]/95 backdrop-blur-sm p-4 z-[99999]" 
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
            onClick={() => handleResponse("declined")}
            className="px-4 py-2 text-white/90 hover:text-white text-sm md:text-base"
          >
            Não Aceitar
          </button>
          <button
            onClick={() => handleResponse("accepted")}
            className="px-4 py-2 bg-[#E321FF] text-white rounded-lg hover:bg-[#E321FF]/90 text-sm md:text-base"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
} 