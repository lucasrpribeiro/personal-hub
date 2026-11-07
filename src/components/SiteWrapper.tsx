"use client";

import { useState } from "react";
import { MatrixRain } from "./MatrixRain";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { RulerLayout } from "./RulerLayout";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";

interface SiteWrapperProps {
  children: React.ReactNode;
}

export function SiteWrapper({ children }: SiteWrapperProps) {
  const [matrixEnabled, setMatrixEnabled] = useState(true);

  return (
    <div className="relative min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Cascata Matrix Prateada 3D */}
      <MatrixRain enabled={matrixEnabled} />

      {/* Progressive Blur superior e inferior */}
      <ProgressiveBlur direction="top" intensity="md" />

      {/* Header Fixo com Réguas e Botão de Alternar Efeito */}
      <AppHeader
        matrixEnabled={matrixEnabled}
        onToggleMatrix={() => setMatrixEnabled((prev) => !prev)}
      />

      {/* Corpo Central Emoldurado por Margens Técnicas */}
      <main className="flex-1 relative z-10">
        <RulerLayout>{children}</RulerLayout>
      </main>

      {/* Rodapé Arquitetural */}
      <AppFooter />
    </div>
  );
}
