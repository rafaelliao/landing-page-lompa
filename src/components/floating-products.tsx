"use client";

import React from "react";
import { AnimatedProduct } from "./animated-product";

export function FloatingProducts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {/* Left side product images - Mobile & Desktop */}
        <AnimatedProduct
          src="/images/product1.jpeg"
          width={120}
          className="top-[20%] -left-[25%] md:top-[30%] md:left-[8%] scale-75 md:scale-100"
          alignSide="left"
        />
        <AnimatedProduct
          src="/images/product2.jpeg"
          width={120}
          className="top-[45%] -left-[20%] md:top-[46%] md:left-[20%] scale-75 md:scale-100"
          alignSide="left"
        />
        <AnimatedProduct
          src="/images/product3.jpeg"
          width={120}
          className="bottom-[20%] -left-[25%] md:bottom-[30%] md:left-[25%] scale-75 md:scale-100"
          alignSide="left"
        />

        {/* Right side product images - Mobile & Desktop */}
        <AnimatedProduct
          src="/images/product5.jpeg"
          width={120}
          className="top-[20%] -right-[25%] md:top-[33%] md:right-[8%] scale-75 md:scale-100"
          alignSide="right"
        />
        <AnimatedProduct
          src="/images/product6.jpeg"
          width={120}
          className="top-[45%] -right-[20%] md:top-[50%] md:right-[18%] scale-75 md:scale-100"
          alignSide="right"
        />
        <AnimatedProduct
          src="/images/product7.jpeg"
          width={120}
          className="bottom-[20%] -right-[25%] md:bottom-[35%] md:right-[30%] scale-75 md:scale-100"
          alignSide="right"
        />

        {/* Top center product - Mobile only */}
        <div className="md:hidden">
          <AnimatedProduct
            src="/images/product9.jpeg"
            width={120}
            className="top-[5%] left-1/2 -translate-x-1/2 scale-75"
          />
        </div>

        {/* Bottom center product - Mobile only */}
        <div className="md:hidden">
          <AnimatedProduct
            src="/images/product8.jpeg"
            width={120}
            className="bottom-[5%] left-1/2 -translate-x-1/2 scale-75"
          />
        </div>

        {/* Desktop only elements */}
        <div className="hidden md:block">
          {/* Top row */}
          <AnimatedProduct
            src="/images/product9.jpeg"
            width={120}
            className="top-[8%] left-[25%] scale-100"
            alignSide="left"
          />
          <AnimatedProduct
            src="/images/product10.jpeg"
            width={120}
            className="top-[12%] left-[40%] scale-100"
          />
          <AnimatedProduct
            src="/images/product11.jpeg"
            width={120}
            className="top-[5%] right-[30%] scale-100"
            alignSide="right"
          />
          <AnimatedProduct
            src="/images/product12.jpeg"
            width={120}
            className="top-[15%] right-[20%] scale-100"
            alignSide="right"
          />

          {/* Additional side images */}
          <AnimatedProduct
            src="/images/product4.jpeg"
            width={120}
            className="bottom-[20%] left-[5%] scale-100"
            alignSide="left"
          />
          <AnimatedProduct
            src="/images/product8.jpeg"
            width={120}
            className="bottom-[15%] right-[10%] scale-100"
            alignSide="right"
          />

          {/* Bottom extras */}
          <AnimatedProduct
            src="/images/product9.jpeg"
            width={120}
            className="bottom-[8%] left-[40%] scale-100"
          />
          <AnimatedProduct
            src="/images/product10.jpeg"
            width={120}
            className="bottom-[10%] right-[38%] scale-100"
          />
        </div>
      </div>
    </div>
  );
}
