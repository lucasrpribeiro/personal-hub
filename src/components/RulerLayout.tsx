import React from "react";

interface RulerLayoutProps {
  children: React.ReactNode;
}

export function RulerLayout({ children }: RulerLayoutProps) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Coluna Central com as duas linhas verticais demarcando o main content */}
      <div className="mx-auto w-full max-w-5xl relative min-h-screen border-x border-zinc-800/80 bg-zinc-950/70 backdrop-blur-[2px]">
        {/* Marcadores de régua vertical na borda esquerda */}
        <div className="absolute top-0 bottom-0 -left-[1px] w-[1px] pointer-events-none select-none hidden lg:block">
          <div className="sticky top-24 -left-7 font-mono text-[9px] text-zinc-600 flex flex-col items-end pr-2 space-y-12">
            <span>[V_01]</span>
            <span>┼</span>
            <span>[V_02]</span>
            <span>┼</span>
            <span>[V_03]</span>
          </div>
        </div>

        {/* Marcadores de régua vertical na borda direita */}
        <div className="absolute top-0 bottom-0 -right-[1px] w-[1px] pointer-events-none select-none hidden lg:block">
          <div className="sticky top-24 -right-7 font-mono text-[9px] text-zinc-600 flex flex-col items-start pl-2 space-y-12">
            <span>[M_DX]</span>
            <span>┼</span>
            <span>[M_MID]</span>
            <span>┼</span>
            <span>[M_END]</span>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="relative z-10 px-4 sm:px-8 md:px-12 py-6 md:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
