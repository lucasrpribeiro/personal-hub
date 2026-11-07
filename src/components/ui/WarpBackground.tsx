"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WarpBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gridColor?: string;
  beamColor?: string;
}

export function WarpBackground({
  children,
  className,
  gridColor = "rgba(255, 255, 255, 0.05)",
  beamColor = "rgba(56, 189, 248, 0.2)",
}: WarpBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded border border-zinc-800/80 bg-zinc-950",
        className
      )}
    >
      {/* 3D Perspective Grid Tunnel */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70"
        style={{ perspective: "450px" }}
      >
        <div
          className="absolute inset-x-0 -top-24 h-[160%] origin-top animate-warp-grid"
          style={{
            transform: "rotateX(68deg)",
            backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradiente Radial para Vignette Suave */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${beamColor} 0%, rgba(9, 9, 11, 0.8) 60%, #09090b 100%)`,
          }}
        />
      </div>

      {/* Conteúdo Renderizado Acima do Grid */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
