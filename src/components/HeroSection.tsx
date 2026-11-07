"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowDown, Terminal, Cpu, Sparkles, BookOpen } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-6 pb-12">
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
        <span className="text-zinc-400">ENGINEERING DISCIPLINE //</span>
        <span className="text-emerald-400 font-medium">ONLINE & CREATING</span>
      </motion.div>

      {/* Título Principal */}
      <div className="mt-8 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 max-w-3xl font-sans"
        >
          Construindo interfaces na fronteira entre{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
            rigor técnico
          </span>{" "}
          e{" "}
          <span className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-8">
            clareza visual
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed pt-2"
        >
          Olá, sou <strong>Lucas Ribeiro</strong> — engenheiro de software focado no ecossistema
          de front-end, arquitetura de interfaces, design systems de alta escala e sistemas web rápidos.
          Este espaço é meu portfólio, caderno de ensaios técnicos e estante cultural.
        </motion.p>
      </div>

      {/* Terminal de especificações rápidas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 rounded border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs text-zinc-400 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5 mb-3 text-[11px] text-zinc-400">
          <div className="flex items-center space-x-2">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-zinc-300">core_profile.config.ts</span>
          </div>
          <span className="text-[10px] text-zinc-400">ENCODING: UTF-8</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
          <div className="flex flex-col space-y-1">
            <span className="text-zinc-400">// ESCOPO</span>
            <span className="text-zinc-200">Arquitetura Front-end & UI</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-zinc-400">// PILARES</span>
            <span className="text-zinc-200">Performance (CWV), A11y, Design Tokens</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-zinc-400">// LOCALIZAÇÃO</span>
            <span className="text-zinc-200">Brasil (Trabalho Global Remoto)</span>
          </div>
        </div>
      </motion.div>

      {/* Botões de Ação Rápida */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center gap-4 pt-2 font-mono text-xs"
      >
        <Link
          href="#timeline"
          className="flex items-center space-x-2 rounded border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 font-medium text-cyan-300 transition-all hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-cyan-200"
        >
          <Cpu className="h-3.5 w-3.5" />
          <span>Explorar Carreira & Skills</span>
          <ArrowDown className="h-3.5 w-3.5 ml-1" />
        </Link>

        <Link
          href="/blog"
          className="flex items-center space-x-2 rounded border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-100"
        >
          <Terminal className="h-3.5 w-3.5 text-zinc-400" />
          <span>Caderno / Blog</span>
        </Link>

        <Link
          href="/estante"
          className="flex items-center space-x-2 rounded border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-100"
        >
          <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
          <span>Estante Cultural</span>
        </Link>
      </motion.div>
    </section>
  );
}
