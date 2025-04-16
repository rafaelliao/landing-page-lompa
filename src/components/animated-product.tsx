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
    
    const blur = scrollY < fadeValues.start ? 0 : 
                scrollY > fadeValues.end ? 10 : 
                fadeProgress * 10;

    return {
      x: finalX * progress,
      y: finalY * progress,
      opacity,
      filter: `blur(${blur}px)`,
    };
  }, [scrollY, alignSide, fadeValues]);

  const transform = getTransform();

  return (
    <motion.div
      ref={productRef}
      className={cn(
        "absolute z-10 rounded-[24px] p-[8px] bg-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]",
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: transform.opacity,
        scale: 1,
        y: transform.y,
        x: transform.x,
        rotate: rotation,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          yoyo: Infinity,
          from: -10,
          to: 10
        },
        rotate: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }
      }}
      style={{
        filter: transform.filter,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div className="w-full h-full overflow-hidden rounded-[20px] bg-[#351B56]/40">
        <Image
          src={src}
          alt="Product"
          className="w-full h-full object-cover"
          width={width - 16}
          height={height - 16}
          priority
        />
      </div>
    </motion.div>
  );
}
