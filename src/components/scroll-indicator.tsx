'use client';

import { FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Esconde a seta quando a página é rolada para baixo
      if (window.scrollY > window.innerHeight * 0.5) {
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
      className="fixed left-1/2 transform -translate-x-1/2 text-white/80 cursor-pointer z-50"
      style={{
        bottom: '10%'
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