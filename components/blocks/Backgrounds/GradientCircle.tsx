"use client"
import React, { useRef, useEffect } from 'react';

interface GradientCircleProps {
  colors: string[];
  speed?: number;
  size?: number;
}

export const GradientCircle: React.FC<GradientCircleProps> = ({
  colors = ['#1A5EFF', '#4C7BFF', '#7F9BFF'],
  speed = 0.01,
  size = 800,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar el canvas al tamaño proporcionado
    canvas.width = size;
    canvas.height = size;

    const drawGradientCircle = () => {
      if (!ctx) return;

      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Incrementar la rotación
      rotationRef.current += speed;

      // Crear gradiente radial
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2;

      // Crear un gradiente con rotación
      const gradient = ctx.createLinearGradient(
        centerX + Math.cos(rotationRef.current) * radius,
        centerY + Math.sin(rotationRef.current) * radius,
        centerX - Math.cos(rotationRef.current) * radius,
        centerY - Math.sin(rotationRef.current) * radius
      );

      // Asignar los colores al gradiente
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });

      // Dibujar el círculo
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Crear un efecto de blur
      ctx.filter = 'blur(50px)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.filter = 'none';

      // Continuar la animación
      animationRef.current = requestAnimationFrame(drawGradientCircle);
    };

    drawGradientCircle();

    return () => {
      // Limpiar la animación cuando el componente se desmonte
      cancelAnimationFrame(animationRef.current);
    };
  }, [colors, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'soft-light' }}
    />
  );
}; 