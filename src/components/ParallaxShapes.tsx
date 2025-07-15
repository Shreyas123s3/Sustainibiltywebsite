import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParallaxShapes = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shapes = [
    { size: 60, x: 10, y: 20, speed: 0.2, opacity: 0.1 },
    { size: 40, x: 80, y: 15, speed: 0.3, opacity: 0.15 },
    { size: 80, x: 60, y: 70, speed: 0.15, opacity: 0.08 },
    { size: 30, x: 20, y: 80, speed: 0.25, opacity: 0.12 },
    { size: 50, x: 90, y: 60, speed: 0.18, opacity: 0.1 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-br from-neon-green/20 to-green-500/10"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
            transform: `translateY(${scrollY * shape.speed}px)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxShapes;