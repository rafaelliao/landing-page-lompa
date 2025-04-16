"use client";

import React from "react";
import { AnimatedProduct } from "./animated-product";
import Image from "next/image";

export function FloatingProducts() {
  const getTransform = (offsetX: number, offsetY: number) => {
    return `translate(${offsetX}px, ${offsetY}px)`;
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {/* Left side product images - Mobile & Desktop */}
        <AnimatedProduct
          src="/images/floating-elements/element1.png"
          width={120}
          className="top-[20%] -left-[25%] md:top-[30%] md:left-[8%] scale-75 md:scale-100"
          alignSide="left"
        />
        <AnimatedProduct
          src="/images/floating-elements/element2.png"
          width={120}
          className="top-[45%] -left-[20%] md:top-[46%] md:left-[20%] scale-75 md:scale-100"
          alignSide="left"
        />
        <AnimatedProduct
          src="/images/floating-elements/element3.png"
          width={120}
          className="bottom-[20%] -left-[25%] md:bottom-[30%] md:left-[25%] scale-75 md:scale-100"
          alignSide="left"
        />

        {/* Right side product images - Mobile & Desktop */}
        <AnimatedProduct
          src="/images/floating-elements/element4.png"
          width={120}
          className="top-[20%] -right-[25%] md:top-[33%] md:right-[8%] scale-75 md:scale-100"
          alignSide="right"
        />
        <AnimatedProduct
          src="/images/floating-elements/element5.png"
          width={120}
          className="top-[45%] -right-[20%] md:top-[50%] md:right-[18%] scale-75 md:scale-100"
          alignSide="right"
        />
        <AnimatedProduct
          src="/images/floating-elements/element6.png"
          width={120}
          className="bottom-[20%] -right-[25%] md:bottom-[35%] md:right-[30%] scale-75 md:scale-100"
          alignSide="right"
        />

        {/* Desktop only elements */}
        <div className="hidden md:block">
          {/* Top row */}
          <AnimatedProduct
            src="/images/floating-elements/element7.png"
            width={120}
            className="top-[8%] left-[25%] scale-100"
            alignSide="left"
          />
          <AnimatedProduct
            src="/images/floating-elements/element8.png"
            width={120}
            className="top-[12%] left-[40%] scale-100"
          />
          <AnimatedProduct
            src="/images/floating-elements/element9.png"
            width={120}
            className="top-[5%] right-[30%] scale-100"
            alignSide="right"
          />
          <AnimatedProduct
            src="/images/floating-elements/element10.png"
            width={120}
            className="top-[15%] right-[20%] scale-100"
            alignSide="right"
          />

          {/* Additional side images */}
          <AnimatedProduct
            src="/images/floating-elements/element11.png"
            width={120}
            className="bottom-[20%] left-[5%] scale-100"
            alignSide="left"
          />
          <AnimatedProduct
            src="/images/floating-elements/element12.png"
            width={120}
            className="bottom-[15%] right-[10%] scale-100"
            alignSide="right"
          />

          {/* Bottom extras */}
          <AnimatedProduct
            src="/images/floating-elements/element13.png"
            width={120}
            className="bottom-[8%] left-[40%] scale-100"
          />
        </div>
      </div>
    </div>
  );
}
