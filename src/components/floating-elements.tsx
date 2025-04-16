'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function FloatingElements() {
  const elements = [
    {
      id: 1,
      src: '/images/floating-elements/element1.png',
      alt: 'Elemento flutuante 1',
      initial: { x: -200, y: -200, opacity: 0, scale: 0.8 },
      animate: { 
        x: [-200, -220, -200],
        y: [-200, -220, -200],
        opacity: [0.5, 1, 0.5],
        scale: [0.8, 1, 0.8],
        rotate: [0, 5, 0]
      },
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    },
    {
      id: 2,
      src: '/images/floating-elements/element2.png',
      alt: 'Elemento flutuante 2',
      initial: { x: 200, y: -200, opacity: 0, scale: 0.8 },
      animate: { 
        x: [200, 220, 200],
        y: [-200, -220, -200],
        opacity: [0.5, 1, 0.5],
        scale: [0.8, 1, 0.8],
        rotate: [0, -5, 0]
      },
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    },
    {
      id: 3,
      src: '/images/floating-elements/element3.png',
      alt: 'Elemento flutuante 3',
      initial: { x: -200, y: 200, opacity: 0, scale: 0.8 },
      animate: { 
        x: [-200, -220, -200],
        y: [200, 220, 200],
        opacity: [0.5, 1, 0.5],
        scale: [0.8, 1, 0.8],
        rotate: [0, 5, 0]
      },
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    },
    {
      id: 4,
      src: '/images/floating-elements/element4.png',
      alt: 'Elemento flutuante 4',
      initial: { x: 200, y: 200, opacity: 0, scale: 0.8 },
      animate: { 
        x: [200, 220, 200],
        y: [200, 220, 200],
        opacity: [0.5, 1, 0.5],
        scale: [0.8, 1, 0.8],
        rotate: [0, -5, 0]
      },
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={element.initial}
          animate={element.animate}
          transition={element.transition}
        >
          <Image
            src={element.src}
            alt={element.alt}
            width={150}
            height={150}
            className="object-contain drop-shadow-lg"
            priority
          />
        </motion.div>
      ))}
    </div>
  );
} 