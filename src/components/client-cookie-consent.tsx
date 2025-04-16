'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientCookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-[#351B56]/80 backdrop-blur-md z-50 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/90">
                  Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
                  <a
                    href="/politica-de-privacidade"
                    className="text-[#8B5CF6] hover:text-[#A78BFA] underline"
                  >
                    Política de Privacidade
                  </a>
                  .
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-3">
                <button
                  onClick={declineCookies}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Não Aceitar
                </button>
                <button
                  onClick={acceptCookies}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#8B5CF6] hover:bg-[#A78BFA] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6]"
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