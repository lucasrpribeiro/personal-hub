"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DitherFieldProps {
  className?: string;
  dotSize?: number;
  interactive?: boolean;
}

// Matriz Bayer 4x4 clássica de Ordered Dithering
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function DitherField({
  className,
  dotSize = 3,
}: DitherFieldProps) {
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
      const width = Math.max(rect.width, 320);
      const height = Math.max(rect.height, 180);
      canvas.width = Math.floor(width / dotSize);
      canvas.height = Math.floor(height / dotSize);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      time += 0.025;
      const w = canvas.width;
      const h = canvas.height;

      if (w <= 0 || h <= 0) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;

          const nx = x / w - 0.5;
          const ny = y / h - 0.5;
          const dist = Math.sqrt(nx * nx + ny * ny);

          // Função de onda harmônica complexa
          const wave =
            Math.sin(dist * 14 - time * 1.5) * 0.4 +
            Math.cos(nx * 10 + time) * 0.3 +
            Math.sin(ny * 8 - time * 0.8) * 0.3 +
            0.5;

          const bayerValue = BAYER_4X4[y % 4][x % 4] / 16;
          const isPoint = wave > bayerValue;

          if (isPoint) {
            // Ponto prateado / ciano suave
            data[idx] = 180;     // R
            data[idx + 1] = 210; // G
            data[idx + 2] = 230; // B
            data[idx + 3] = 110; // Alpha visível e nítido
          } else {
            data[idx + 3] = 0;
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
        "pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated]",
        className
      )}
    />
  );
}
