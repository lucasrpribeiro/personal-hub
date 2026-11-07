"use client";

import React, { useState, useEffect } from "react";
import { Terminal as TerminalIcon, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalCommand {
  cmd: string;
  output: React.ReactNode;
}

const COMMANDS: TerminalCommand[] = [
  {
    cmd: "whoami",
    output: (
      <div className="space-y-1 text-zinc-300">
        <p>
          <span className="text-cyan-400 font-bold">name:</span> Lucas Ribeiro
        </p>
        <p>
          <span className="text-cyan-400 font-bold">role:</span> Senior Frontend Engineer & UI Architect
        </p>
        <p>
          <span className="text-cyan-400 font-bold">focus:</span> High-Scale Web Architecture, Web Vitals, Design Systems
        </p>
      </div>
    ),
  },
  {
    cmd: "cat stack.json",
    output: (
      <div className="text-zinc-400 font-mono text-[11px] leading-relaxed">
        <span className="text-zinc-600">{"{"}</span>
        <div className="pl-4">
          <p>&quot;core&quot;: [&quot;TypeScript&quot;, &quot;Next.js&quot;, &quot;React 19&quot;, &quot;Vue 3&quot;],</p>
          <p>&quot;styling&quot;: [&quot;Tailwind CSS&quot;, &quot;Design Tokens&quot;, &quot;Radix UI&quot;],</p>
          <p>&quot;performance&quot;: [&quot;Web Workers&quot;, &quot;Streaming SSR&quot;, &quot;INP &lt; 50ms&quot;]</p>
        </div>
        <span className="text-zinc-600">{"}"}</span>
      </div>
    ),
  },
  {
    cmd: "pnpm run audit:cwv",
    output: (
      <div className="space-y-1 text-xs">
        <p className="text-emerald-400">✔ Largest Contentful Paint (LCP): 0.8s [GOOD]</p>
        <p className="text-emerald-400">✔ Interaction to Next Paint (INP): 24ms [OPTIMAL]</p>
        <p className="text-emerald-400">✔ Cumulative Layout Shift (CLS): 0.002 [ZERO SHIFT]</p>
        <p className="text-zinc-500 text-[10px] pt-1">// Performance Score: 100/100 (Mobile & Desktop)</p>
      </div>
    ),
  },
];

export function Terminal() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const active = COMMANDS[activeTab];

  useEffect(() => {
    setIsTyping(true);
    setTypedCommand("");
    let currentIdx = 0;
    const targetCmd = active.cmd;

    const interval = setInterval(() => {
      if (currentIdx <= targetCmd.length) {
        setTypedCommand(targetCmd.slice(0, currentIdx));
        currentIdx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [activeTab, active.cmd]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(active.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded border border-zinc-800 bg-zinc-950/90 font-mono shadow-2xl overflow-hidden">
      {/* Barra de Título do Terminal */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80 hover:bg-red-500/80 transition-colors" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80 hover:bg-yellow-500/80 transition-colors" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700/80 hover:bg-emerald-500/80 transition-colors" />
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center space-x-1.5 text-zinc-300">
            <TerminalIcon className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[11px] font-medium">lucas@architecture:~</span>
          </div>
        </div>

        {/* Abas Interativas de Comandos */}
        <div className="hidden sm:flex items-center space-x-1">
          {COMMANDS.map((item, idx) => (
            <button
              key={item.cmd}
              onClick={() => setActiveTab(idx)}
              className={cn(
                "rounded px-2 py-0.5 text-[10px] transition-colors border",
                activeTab === idx
                  ? "bg-zinc-800 border-zinc-700 text-cyan-400 font-semibold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
              )}
            >
              ${item.cmd.split(" ")[0]}
            </button>
          ))}
        </div>

        <button
          onClick={copyToClipboard}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          title="Copiar comando"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
        </button>
      </div>

      {/* Janela de Saída do Terminal */}
      <div className="p-5 text-xs space-y-4 min-h-[160px]">
        {/* Linha de Prompt */}
        <div className="flex items-center space-x-2">
          <span className="text-emerald-400 font-bold">❯</span>
          <span className="text-cyan-400 font-medium">lucas@hub</span>
          <span className="text-zinc-600">:</span>
          <span className="text-zinc-400">~</span>
          <span className="text-zinc-100 font-bold">{typedCommand}</span>
          <span
            className={cn(
              "inline-block h-4 w-2 bg-cyan-400",
              isTyping ? "opacity-100" : "animate-pulse"
            )}
          />
        </div>

        {/* Saída do Comando */}
        <div className={cn("pt-1 transition-opacity duration-300", isTyping ? "opacity-0" : "opacity-100")}>
          {active.output}
        </div>
      </div>
    </div>
  );
}
