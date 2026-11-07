"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  enabled?: boolean;
}

interface LayerConfig {
  fontSize: number;
  speed: number;
  headColor: string;
  bodyColor: string;
  tailColor: string;
  glow: boolean;
}

const LAYERS: LayerConfig[] = [
  // Camada 0: Fundo profundo (caracteres pequenos, velocidade lenta, tons de chumbo/aço)
  {
    fontSize: 11,
    speed: 0.8,
    headColor: "rgba(203, 213, 225, 0.7)", // slate-300
    bodyColor: "rgba(100, 116, 139, 0.4)", // slate-500
    tailColor: "rgba(51, 65, 85, 0.15)",   // slate-700
    glow: false,
  },
  // Camada 1: Plano médio (caracteres médios, velocidade média, prata metálica)
  {
    fontSize: 15,
    speed: 1.6,
    headColor: "#FFFFFF",
    bodyColor: "rgba(226, 232, 240, 0.75)", // slate-200
    tailColor: "rgba(100, 116, 139, 0.3)",  // slate-500
    glow: true,
  },
  // Camada 2: Primeiro plano (caracteres grandes, rápidos, branco brilhante com brilho prateado)
  {
    fontSize: 20,
    speed: 2.6,
    headColor: "#FFFFFF",
    bodyColor: "rgba(248, 250, 252, 0.95)", // slate-50
    tailColor: "rgba(148, 163, 184, 0.45)", // slate-400
    glow: true,
  },
];

// Glifos universais 100% suportados em qualquer SO (Linux, macOS, Windows) sem tofu box
const GLYPHS =
  "0101100101ABCDEF0123456789XYZKM{}[]<>/\\*+-=~:;λπΣΩ$#%&|";

export function MatrixRain({ enabled = true }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    if (!enabled) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      // Preencher com a cor de fundo zinc-950 quando desligado
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ajuste de DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.textBaseline = "top";

    // Fundo inicial imediato
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, width, height);

    interface ColumnDrop {
      y: number;
      char: string;
      length: number;
    }

    // Inicializar cada camada com gotas já distribuídas pela tela
    const layersData = LAYERS.map((layer) => {
      const columnsCount = Math.floor(width / layer.fontSize);
      const drops: ColumnDrop[] = [];

      for (let i = 0; i < columnsCount; i++) {
        drops.push({
          y: Math.random() * height, // Já começa preenchido por toda a tela
          char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          length: Math.floor(Math.random() * 16) + 8,
        });
      }

      return {
        ...layer,
        columnsCount,
        drops,
      };
    });

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      ctx.textBaseline = "top";

      // Readequar colunas
      layersData.forEach((layer) => {
        const count = Math.floor(width / layer.fontSize);
        layer.columnsCount = count;
        while (layer.drops.length < count) {
          layer.drops.push({
            y: Math.random() * height,
            char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            length: Math.floor(Math.random() * 16) + 8,
          });
        }
      });
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      if (!isVisible) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Rastro suave em zinc-950 (#09090b)
      ctx.fillStyle = "rgba(9, 9, 11, 0.16)";
      ctx.fillRect(0, 0, width, height);

      // Renderizar camadas (fundo -> frente)
      layersData.forEach((layer) => {
        ctx.font = `${layer.fontSize}px ui-monospace, SFMono-Regular, "Liberation Mono", Menlo, monospace`;

        for (let i = 0; i < layer.columnsCount; i++) {
          const drop = layer.drops[i];
          const x = i * layer.fontSize;
          const trailLength = drop.length;

          for (let t = 0; t < trailLength; t++) {
            const charY = drop.y - t * (layer.fontSize * 1.15);
            if (charY < -layer.fontSize || charY > height + layer.fontSize) continue;

            const ratio = t / trailLength; // 0 = cabeça (mais claro), 1 = cauda (mais escuro)

            if (t === 0) {
              // Cabeça branca brilhante
              ctx.fillStyle = layer.headColor;
              if (layer.glow) {
                ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
                ctx.shadowBlur = 8;
              }
            } else if (ratio < 0.45) {
              // Meio da cascata: prata metálica
              ctx.fillStyle = layer.bodyColor;
              ctx.shadowBlur = 0;
            } else {
              // Cauda: cinza escuro/chumbo
              ctx.fillStyle = layer.tailColor;
              ctx.shadowBlur = 0;
            }

            // Alternar caractere ocasionalmente
            const charToDraw =
              Math.random() > 0.96
                ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                : drop.char;

            ctx.fillText(charToDraw, x, charY);
          }

          ctx.shadowBlur = 0;

          // Descer gota
          drop.y += layer.fontSize * layer.speed * 0.45;

          // Trocar letra da cabeça
          if (Math.random() > 0.82) {
            drop.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }

          // Reiniciar gota quando a cauda sumir abaixo da tela
          if (drop.y - trailLength * layer.fontSize > height) {
            drop.y = Math.random() * -50;
            drop.length = Math.floor(Math.random() * 16) + 8;
          }
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 h-full w-full transition-opacity duration-500 ${
        enabled ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
}
