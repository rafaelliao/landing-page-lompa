"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AnimatedProductProps {
  src: string;
  width: number;
  height?: number;
  className?: string;
  alignSide?: "left" | "right";
}

export function AnimatedProduct({
  src,
  width,
  height: propHeight,
  className,
  alignSide = "left",
}: AnimatedProductProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [referenceCardPosition, setReferenceCardPosition] = useState({ x: 0, y: 0 });
  const rotation = React.useMemo(() => Math.random() * 10 - 5, []);
  const height = propHeight || Math.round((width * 4) / 3);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px é o breakpoint md do Tailwind
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Atualiza a posição do card de referência
      const referenceCard = document.querySelector('.reference-card');
      if (referenceCard) {
        const rect = referenceCard.getBoundingClientRect();
        setReferenceCardPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile(); // Checa inicialmente
    handleScroll(); // Chama uma vez no início
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const getTransform = () => {
    if (productRef.current) {
      const progress = Math.min(scrollY / 800, 1);
      const productRect = productRef.current.getBoundingClientRect();
      const productCenter = {
        x: productRect.left + productRect.width / 2,
        y: productRect.top + productRect.height / 2
      };

      // Calcula a distância até o centro do card de referência
      const distanceX = referenceCardPosition.x - productCenter.x;
      const distanceY = referenceCardPosition.y - productCenter.y;

      // Ajusta o movimento baseado no alinhamento
      let finalX = distanceX;
      let finalY = distanceY;

      if (alignSide === "left") {
        // Elementos da esquerda só se movem para a direita
        finalX = Math.max(0, distanceX);
      } else if (alignSide === "right") {
        // Elementos da direita só se movem para a esquerda
        finalX = Math.min(0, distanceX);
      }

      // Valores de fade diferentes para mobile e desktop
      const fadeStart = isMobile ? 200 : 400; // Mobile: 200px, Desktop: 400px
      const fadeEnd = isMobile ? 300 : 500;   // Mobile: 300px, Desktop: 500px
      const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
      
      // Efeito de dissolve com flutuação
      const opacity = scrollY < fadeStart ? 1 : 
                     scrollY > fadeEnd ? 0 : 
                     1 - fadeProgress;
      
      // Efeito de flutuação suave durante o fade out
      const floatY = scrollY < fadeStart ? 0 : 
                    scrollY > fadeEnd ? 20 : 
                    fadeProgress * 20;
      
      // Efeito de blur durante o fade out
      const blur = scrollY < fadeStart ? 0 : 
                  scrollY > fadeEnd ? 10 : 
                  fadeProgress * 10;

      return {
        x: progress * finalX,
        y: progress * finalY + floatY,
        opacity: opacity,
        filter: `blur(${blur}px)`
      };
    }
    return { x: 0, y: 0, opacity: 1, filter: 'blur(0px)' };
  };

  const commonClasses = cn(
    "absolute z-10 rounded-[22px] p-[6px] bg-white/20 backdrop-blur-sm shadow-lg",
    className
  );

  const commonStyles = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const transform = getTransform();

  return (
    <motion.div
      ref={productRef}
      className={commonClasses}
      animate={{
        x: transform.x,
        y: transform.y,
        opacity: transform.opacity,
        filter: transform.filter
      }}
      style={{
        ...commonStyles,
        rotate: rotation
      }}
    >
      <div className="w-full h-full overflow-hidden rounded-[16px] bg-[#351B56]/50">
        <Image
          src={src}
          alt="Product"
          className="w-full h-full object-cover"
          width={width - 12}
          height={height - 12}
          priority={false}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
