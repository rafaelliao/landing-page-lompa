'use client';

import { FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Calcula a posição atual do scroll em relação ao final da página
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollEnd = documentHeight - windowHeight;

      // Esconde a seta apenas quando chegar ao final da página
      if (scrollPosition >= scrollEnd - 100) { // 100px de margem antes do final
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed text-white/80 cursor-pointer z-50"
      style={{
        bottom: '10%',
        left: 'calc(50% - 185px)', // Centraliza em relação ao card de 370px
        width: '370px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: [0.5, 1, 0.5],
        y: [0, 10, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      onClick={handleClick}
    >
      <FaChevronDown 
        size={32}
        className="hover:text-white transition-colors"
      />
    </motion.div>
  );
} 