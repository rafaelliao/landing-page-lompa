"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function ReferenceCard() {
  const [scrollY, setScrollY] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/main_video1.png",
    "/images/main_video2.png",
    "/images/main video3.png"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowImage(window.scrollY >= 150);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showImage) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showImage]);

  return (
    <>
      <div 
        className="reference-card fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[384px] h-[720px] pointer-events-none z-20" 
        style={{ visibility: 'hidden' }}
      />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[640px] rounded-[8px] pointer-events-none z-20 overflow-hidden">
        <AnimatePresence mode="wait">
          {showImage && (
            <motion.div
              key={currentImageIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ 
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[8px]"
              style={{
                padding: '0',
                fontFamily: 'Nunito, system-ui, sans-serif'
              }}
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Main Video ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                width={320}
                height={640}
                priority={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 