"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DitherFieldProps {
  className?: string;
  dotSize?: number;
}

// Matriz Bayer 4x4 clássica de Ordered Dithering
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function DitherField({ className, dotSize = 4 }: DitherFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width / dotSize;
      canvas.height = rect.height / dotSize;
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      time += 0.03;
      const w = canvas.width;
      const h = canvas.height;

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;

          // Função de onda matemática ondulante
          const nx = x / w - 0.5;
          const ny = y / h - 0.5;
          const dist = Math.sqrt(nx * nx + ny * ny);

          const wave =
            Math.sin(dist * 12 - time) * 0.5 +
            Math.sin(nx * 8 + time * 0.5) * 0.25 +
            0.5;

          // Mapear na matriz de Bayer
          const bayerValue = BAYER_4X4[y % 4][x % 4] / 16;
          const isWhite = wave > bayerValue;

          if (isWhite) {
            data[idx] = 200;     // R (prata suave)
            data[idx + 1] = 210; // G
            data[idx + 2] = 225; // B
            data[idx + 3] = 45;  // Alpha sutil para não ofuscar o texto
          } else {
            data[idx + 3] = 0;   // Transparente
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [dotSize]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full opacity-60 [image-rendering:pixelated]",
        className
      )}
    />
  );
}
