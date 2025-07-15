import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BackgroundMotion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Flowing lines animation
    const lines: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      points: Array<{ x: number; y: number }>;
      opacity: number;
      hue: number;
    }> = [];

    // Initialize flowing lines
    for (let i = 0; i < 8; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        points: [],
        opacity: Math.random() * 0.3 + 0.1,
        hue: 120 + Math.random() * 60 // Green variations
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line, index) => {
        // Update position with smooth movement
        line.x += line.vx + Math.sin(time + index) * 0.2;
        line.y += line.vy + Math.cos(time + index * 0.7) * 0.2;

        // Wrap around edges
        if (line.x < 0) line.x = canvas.width;
        if (line.x > canvas.width) line.x = 0;
        if (line.y < 0) line.y = canvas.height;
        if (line.y > canvas.height) line.y = 0;

        // Add current position to trail
        line.points.push({ x: line.x, y: line.y });
        
        // Limit trail length
        if (line.points.length > 50) {
          line.points.shift();
        }

        // Draw flowing line
        if (line.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(line.points[0].x, line.points[0].y);
          
          for (let i = 1; i < line.points.length; i++) {
            const point = line.points[i];
            const alpha = (i / line.points.length) * line.opacity;
            
            ctx.strokeStyle = `hsla(${line.hue}, 70%, 60%, ${alpha})`;
            ctx.lineWidth = 2 * (i / line.points.length);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
          }
        }

        // Occasionally change direction
        if (Math.random() < 0.01) {
          line.vx += (Math.random() - 0.5) * 0.1;
          line.vy += (Math.random() - 0.5) * 0.1;
          
          // Limit velocity
          line.vx = Math.max(-1, Math.min(1, line.vx));
          line.vy = Math.max(-1, Math.min(1, line.vy));
        }
      });

      // Draw connecting nodes
      lines.forEach((line1, i) => {
        lines.slice(i + 1).forEach((line2) => {
          const dx = line1.x - line2.x;
          const dy = line1.y - line2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.1;
            ctx.strokeStyle = `rgba(193, 248, 97, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(line1.x, line1.y);
            ctx.lineTo(line2.x, line2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Additional floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(193, 248, 97, 0.6) 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(193, 248, 97, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(22, 163, 74, 0.05) 0%, transparent 70%)
          `
        }}
      />
    </div>
  );
};

export default BackgroundMotion;