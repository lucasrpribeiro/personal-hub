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
  gridColor = "rgba(255, 255, 255, 0.12)",
  beamColor = "rgba(56, 189, 248, 0.35)",
}: WarpBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded border border-zinc-800 bg-zinc-950 shadow-2xl",
        className
      )}
    >
      {/* 3D Perspective Grid Tunnel (Warp Field) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{ perspective: "400px" }}
      >
        {/* Grid plano superior em perspectiva */}
        <div
          className="absolute inset-x-0 -top-32 h-[180%] origin-top animate-warp-grid opacity-80"
          style={{
            transform: "rotateX(65deg)",
            backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Gradiente Radial com centro em ciano elétrico suave */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 20%, ${beamColor} 0%, rgba(9, 9, 11, 0.85) 55%, #09090b 100%)`,
          }}
        />

        {/* Linha de horizonte técnica */}
        <div className="absolute top-[35%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </div>

      {/* Conteúdo Renderizado Acima do Grid */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
