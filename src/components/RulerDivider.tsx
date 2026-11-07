import React from "react";

interface RulerDividerProps {
  label?: string;
  tag?: string;
  className?: string;
}

export function RulerDivider({ label, tag, className = "" }: RulerDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden my-16 md:my-24 select-none ${className}`}>
      {/* Linha que se expande para 100vw atravessando toda a largura da tela */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 border-b border-zinc-800 flex items-center">
        {/* Ticks milimétricos técnicos ao longo da régua */}
        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-40">
          <div className="flex space-x-2 text-[9px] font-mono text-zinc-600 pl-4">
            <span>+000</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>+100</span>
          </div>
          <div className="hidden md:flex space-x-3 text-[9px] font-mono text-zinc-600">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>[REF // GRID_100VW]</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="flex space-x-2 text-[9px] font-mono text-zinc-600 pr-4">
            <span>-100</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>+END</span>
          </div>
        </div>

        {/* Marcador central ou alinhado ao conteúdo */}
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3 bg-zinc-950 px-3 py-1 border border-zinc-800/80 -mb-[1px]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {tag && (
              <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400">
                {tag}
              </span>
            )}
            {label && (
              <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">
                // {label}
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-2 font-mono text-[10px] text-zinc-600 bg-zinc-950 px-2 py-0.5 border border-zinc-800/50">
            <span>SEC_MARK</span>
            <span className="text-zinc-400 font-bold">┼</span>
          </div>
        </div>
      </div>
    </div>
  );
}
