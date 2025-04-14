"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function SmartphoneMockup() {
  const [scrollY, setScrollY] = useState(0);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax effect based on scroll position
  const calculateParallax = () => {
    if (scrollY < 50) return 0;
    return Math.min(scrollY * 0.05, 20); // Limit max movement
  };

  return (
    <div
      ref={mockupRef}
      className="absolute left-1/2 top-[55%] transform -translate-x-1/2 -translate-y-1/2 z-20"
      style={{
        transform: `translate(-50%, calc(-50% - ${calculateParallax()}px))`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      <div className="relative w-[220px] h-[440px]">
        {/* Smartphone frame */}
        <Image
          src="/images/smartphone-mockup.png"
          alt="Smartphone"
          width={220}
          height={440}
          className="absolute inset-0 z-10"
          priority={true}
        />

        {/* App screenshot inside phone */}
        <div className="absolute top-[38px] left-[11px] right-[11px] bottom-[38px] overflow-hidden rounded-[18px] z-0">
          <Image
            src="/images/app-screenshot.png"
            alt="App Screenshot"
            fill
            className="object-cover"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
