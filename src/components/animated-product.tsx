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
  const productRef = useRef<HTMLDivElement>(null);
  const referenceCardRef = useRef<DOMRect | null>(null);
  const rotation = React.useMemo(() => Math.random() * 10 - 5, []);
  const height = propHeight || Math.round((width * 4) / 3);

  // Memoize os valores de fade para evitar recálculos
  const fadeValues = React.useMemo(() => ({
    start: isMobile ? 200 : 400,
    end: isMobile ? 300 : 500
  }), [isMobile]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Atualiza a posição do card de referência apenas quando necessário
      if (!referenceCardRef.current) {
        const referenceCard = document.querySelector('.reference-card');
        if (referenceCard) {
          referenceCardRef.current = referenceCard.getBoundingClientRect();
        }
      }
    };

    // Usar requestAnimationFrame para otimizar o scroll
    let animationFrameId: number;
    const optimizedScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', optimizedScroll);
    window.addEventListener('resize', checkMobile);
    
    checkMobile();
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', optimizedScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const getTransform = React.useCallback(() => {
    if (!productRef.current || !referenceCardRef.current) {
      return { x: 0, y: 0, opacity: 1, filter: 'blur(0px)' };
    }

    const progress = Math.min(scrollY / 800, 1);
    const productRect = productRef.current.getBoundingClientRect();
    const productCenter = {
      x: productRect.left + productRect.width / 2,
      y: productRect.top + productRect.height / 2
    };

    const distanceX = referenceCardRef.current.left + referenceCardRef.current.width / 2 - productCenter.x;
    const distanceY = referenceCardRef.current.top + referenceCardRef.current.height / 2 - productCenter.y;

    let finalX = alignSide === "left" ? Math.max(0, distanceX) : Math.min(0, distanceX);
    let finalY = distanceY;

    const fadeProgress = (scrollY - fadeValues.start) / (fadeValues.end - fadeValues.start);
    const opacity = scrollY < fadeValues.start ? 1 : 
                   scrollY > fadeValues.end ? 0 : 
                   1 - fadeProgress;
    
    const floatY = scrollY < fadeValues.start ? 0 : 
                  scrollY > fadeValues.end ? 20 : 
                  fadeProgress * 20;
    
    const blur = scrollY < fadeValues.start ? 0 : 
                scrollY > fadeValues.end ? 10 : 
                fadeProgress * 10;

    return {
      x: progress * finalX,
      y: progress * finalY + floatY,
      opacity,
      filter: `blur(${blur}px)`
    };
  }, [scrollY, alignSide, fadeValues]);

  const transform = getTransform();

  return (
    <motion.div
      ref={productRef}
      className={cn(
        "absolute z-10 rounded-[22px] p-[6px] bg-white/20 backdrop-blur-sm shadow-lg",
        className
      )}
      animate={{
        x: transform.x,
        y: transform.y,
        opacity: transform.opacity,
        filter: transform.filter
      }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        rotate: rotation
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
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
