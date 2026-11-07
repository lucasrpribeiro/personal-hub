"use client";

import { motion } from "motion/react";
import { techConceptCategories } from "@/data/concepts";
import { Cpu, Zap, Palette, ShieldCheck, Sparkles, Activity } from "lucide-react";
import { DitherField } from "@/components/ui/DitherField";
import { BorderBeam } from "@/components/ui/BorderBeam";

const categoryIcons = [Zap, Cpu, Palette, ShieldCheck];

export function TechConcepts() {
  return (
    <section id="skills" className="relative scroll-mt-24 space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          Habilidades & Conceitos de Frontend
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
          Fundamentos técnicos, padrões de arquitetura e especialização em ecossistemas modernos de navegadores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techConceptCategories.map((category, catIndex) => {
          const Icon = categoryIcons[catIndex % categoryIcons.length];

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="flex flex-col rounded border border-zinc-800 bg-zinc-950/60 p-6 transition-all hover:border-zinc-700 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              {/* Cabeçalho da Categoria */}
              <div className="flex items-center space-x-3 border-b border-zinc-900 pb-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-cyan-400">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-zinc-100">
                    {category.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Lista de Conceitos */}
              <div className="space-y-4 flex-1">
                {category.concepts.map((concept) => (
                  <div
                    key={concept.name}
                    className="group/item rounded border border-zinc-900/80 bg-zinc-900/30 p-3 transition-colors hover:border-zinc-800 hover:bg-zinc-900/60"
                  >
                    <h4 className="font-mono text-xs font-semibold text-zinc-200 group-hover/item:text-cyan-400 transition-colors">
                      {concept.name}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                      {concept.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {concept.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-zinc-950 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 border border-zinc-900"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CARD DE LABORATÓRIO VISUAL: DITHER FIELD + BORDER BEAM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl"
      >
        {/* Dither Field interativo animado em tempo real no fundo do card */}
        <DitherField dotSize={3} className="opacity-70" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 rounded border border-cyan-500/30 bg-zinc-900/90 px-3 py-1 font-mono text-[11px] text-cyan-400">
            <Activity className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
            <span>LAB // ORDERED DITHERING (BAYER 4X4 SHADER)</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
            Computação Criativa & Algoritmos de Renderização 2D
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Demonstração em tempo real de manipulação de buffers diretos com <strong>HTML5 Canvas API</strong>.
            A matriz de Bayer 4x4 calcula a dispersão de luminância sobre ondas procedurais sem depender de pacotes externos pesados, operando com 60 FPS consistentes.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
            <span className="rounded bg-zinc-900/90 border border-zinc-800 px-2.5 py-0.5 text-zinc-300">
              #Canvas2D
            </span>
            <span className="rounded bg-zinc-900/90 border border-zinc-800 px-2.5 py-0.5 text-zinc-300">
              #BayerDithering
            </span>
            <span className="rounded bg-zinc-900/90 border border-zinc-800 px-2.5 py-0.5 text-zinc-300">
              #ProceduralMath
            </span>
            <span className="rounded bg-zinc-900/90 border border-zinc-800 px-2.5 py-0.5 text-cyan-300">
              #60FPS_Stable
            </span>
          </div>
        </div>

        {/* Feixe laser luminoso Border Beam */}
        <BorderBeam
          size={240}
          duration={12}
          colorFrom="#38bdf8"
          colorTo="#ffffff"
        />
      </motion.div>
    </section>
  );
}
