"use client";

import { useEffect, useRef, useState } from "react";

interface MatrixRainProps {
  enabled?: boolean;
}

// 3 Camadas de Profundidade (Parallax & Depth of Field)
interface LayerConfig {
  fontSize: number;
  speed: number;
  alphaBase: number;
  colorHead: string;
  colorBody: string;
  colorTail: string;
  dropInterval: number; // Intervalo de atualização para modular velocidade
}

const LAYERS: LayerConfig[] = [
  // Camada 0: Fundo profundo (caracteres pequenos, escuros, lentos)
  {
    fontSize: 10,
    speed: 0.7,
    alphaBase: 0.18,
    colorHead: "rgba(203, 213, 225, 0.45)", // slate-300
    colorBody: "rgba(100, 116, 139, 0.25)", // slate-500
    colorTail: "rgba(51, 65, 85, 0.12)",   // slate-700
    dropInterval: 5,
  },
  // Camada 1: Plano médio (caracteres médios, tons de prata metálica)
  {
    fontSize: 14,
    speed: 1.4,
    alphaBase: 0.4,
    colorHead: "rgba(241, 245, 249, 0.85)", // slate-100
    colorBody: "rgba(148, 163, 184, 0.55)", // slate-400
    colorTail: "rgba(71, 85, 105, 0.25)",  // slate-600
    dropInterval: 3,
  },
  // Camada 2: Primeiro plano (caracteres grandes, brancos brilhantes no topo, esmaecendo)
  {
    fontSize: 19,
    speed: 2.4,
    alphaBase: 0.85,
    colorHead: "#FFFFFF",                   // Branco puro brilhante
    colorBody: "rgba(226, 232, 240, 0.85)", // slate-200
    colorTail: "rgba(100, 116, 139, 0.35)", // slate-500
    dropInterval: 2,
  },
];

// Conjunto de glifos: Katakana, Hex, símbolos técnicos e operadores
const GLYPHS =
  "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ{}<>/*+-=~λπΣΩ#$_";

export function MatrixRain({ enabled = true }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(enabled);

  useEffect(() => {
    setIsActive(enabled);
  }, [enabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ajuste de DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Estado das gotas para cada camada
    interface ColumnDrop {
      y: number;
      char: string;
      length: number;
      history: { char: string; y: number }[];
    }

    const layersData = LAYERS.map((layer) => {
      const columnsCount = Math.floor(width / layer.fontSize);
      const drops: ColumnDrop[] = [];

      for (let i = 0; i < columnsCount; i++) {
        drops.push({
          y: Math.random() * -height, // Começa fora da tela com dispersão
          char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          length: Math.floor(Math.random() * 14) + 8, // Comprimento da cauda
          history: [],
        });
      }

      return {
        ...layer,
        columnsCount,
        drops,
        step: 0,
      };
    });

    let isDocumentVisible = true;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Recalcular colunas
      layersData.forEach((layer) => {
        const count = Math.floor(width / layer.fontSize);
        layer.columnsCount = count;
        while (layer.drops.length < count) {
          layer.drops.push({
            y: Math.random() * -height,
            char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            length: Math.floor(Math.random() * 14) + 8,
            history: [],
          });
        }
      });
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Fundo translúcido para dar o efeito de rastro
      ctx.fillStyle = "rgba(9, 9, 11, 0.22)";
      ctx.fillRect(0, 0, width, height);

      // Renderiza as 3 camadas em ordem: Fundo (0), Meio (1), Frente (2)
      layersData.forEach((layer, layerIndex) => {
        layer.step++;
        ctx.font = `${layer.fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;

        const isForeGround = layerIndex === 2;

        for (let i = 0; i < layer.columnsCount; i++) {
          const drop = layer.drops[i];
          const x = i * layer.fontSize;

          // Desenhar cauda (do mais escuro ao mais claro)
          const trailLength = drop.length;
          for (let t = 0; t < trailLength; t++) {
            const charY = drop.y - t * (layer.fontSize * 1.15);
            if (charY < 0 || charY > height) continue;

            // Gradiente: Cabeça (t=0) mais clara -> Final da cauda mais escura
            const ratio = t / trailLength; // 0 (topo) a 1 (final)

            if (t === 0) {
              // Letra guia (Cabeça da cascata)
              ctx.fillStyle = layer.colorHead;
              if (isForeGround) {
                ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
                ctx.shadowBlur = 6;
              }
            } else if (ratio < 0.4) {
              ctx.fillStyle = layer.colorBody;
              ctx.shadowBlur = 0;
            } else {
              ctx.fillStyle = layer.colorTail;
              ctx.shadowBlur = 0;
            }

            // Ocasionalmente trocar o caractere para dar o efeito de decodificação
            const charToDraw =
              Math.random() > 0.94
                ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                : drop.char;

            ctx.fillText(charToDraw, x, charY);
          }

          ctx.shadowBlur = 0; // Reset shadow

          // Avançar gota
          drop.y += layer.fontSize * layer.speed * 0.45;

          // Alternar caractere da cabeça
          if (Math.random() > 0.8) {
            drop.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }

          // Reset quando a cascata ultrapassa a base
          if (drop.y - trailLength * layer.fontSize > height) {
            drop.y = Math.random() * -100;
            drop.length = Math.floor(Math.random() * 14) + 8;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 h-full w-full opacity-65 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
