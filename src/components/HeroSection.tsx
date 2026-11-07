"use client";

import { motion } from "motion/react";
import { Terminal } from "@/components/ui/Terminal";
import { MorphingText } from "@/components/ui/MorphingText";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { WarpBackground } from "@/components/ui/WarpBackground";
import { ArrowDown, Cpu, Terminal as TerminalIcon, BookOpen } from "lucide-react";

export function HeroSection() {
  const morphRoles = [
    "Frontend Engineer",
    "UI Architect",
    "Design System Craft",
    "Web Performance Lead",
  ];

  return (
    <section className="relative pt-6 pb-12 space-y-10">
      {/* Badge de status no topo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-mono text-zinc-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-zinc-500">// SYS_PROFILE</span>
        <span className="text-emerald-400 font-semibold">ONLINE & BUILDING</span>
      </motion.div>

      {/* Título Principal com Morphing Text */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 max-w-3xl font-sans"
        >
          Construindo interfaces como{" "}
          <span className="text-cyan-400">
            <MorphingText texts={morphRoles} />
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed"
        >
          Olá, sou <strong>Lucas Ribeiro</strong> — engenheiro de software focado em
          arquitetura de interfaces resilientes, design systems escaláveis e otimização
          extrema de performance web. Este espaço une meu portfólio, caderno de ensaios e estante cultural.
        </motion.p>
      </div>

      {/* Terminal Interativo emoldurado com WarpBackground e BorderBeam */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        <WarpBackground className="p-2 sm:p-3">
          <div className="relative rounded overflow-hidden">
            <Terminal />
            {/* Luminous Border Beam ao redor do terminal */}
            <BorderBeam
              size={180}
              duration={10}
              colorFrom="#38bdf8"
              colorTo="#ffffff"
            />
          </div>
        </WarpBackground>
      </motion.div>

      {/* Botões de Ação com InteractiveHoverButton */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap items-center gap-3 pt-2"
      >
        <InteractiveHoverButton
          text="Explorar Carreira"
          href="#timeline"
          variant="cyan"
        />

        <InteractiveHoverButton
          text="Caderno / Blog"
          href="/blog"
          variant="white"
        />

        <InteractiveHoverButton
          text="Estante Cultural"
          href="/estante"
          variant="emerald"
        />
      </motion.div>
    </section>
  );
}
