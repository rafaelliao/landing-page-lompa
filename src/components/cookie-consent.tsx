"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasUserChoice, setHasUserChoice] = useState(false);

  useEffect(() => {
    // Verifica se já existe uma escolha salva
    const cookieChoice = localStorage.getItem("cookieConsent");
    if (cookieChoice) {
      setHasUserChoice(true);
      return;
    }

    // Exibe o aviso após 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    setHasUserChoice(true);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
    setHasUserChoice(true);
  };

  if (hasUserChoice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50"
        >
          <div className="bg-[#351B56]/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white/90 text-sm md:text-base">
                Utilizamos cookies para melhorar sua experiência em nosso site. 
                Ao continuar navegando, você concorda com nossa{" "}
                <a href="/politica-privacidade" className="text-[#8B5CF6] hover:text-[#A78BFA] underline">
                  Política de Privacidade
                </a>
                .
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Recusar
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 text-sm font-medium text-white bg-[#8B5CF6] hover:bg-[#A78BFA] rounded-lg transition-colors"
                >
                  Aceitar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 