"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Terminal, Sparkles, Menu, X, BookOpen, Layers, Briefcase, Code2 } from "lucide-react";

interface AppHeaderProps {
  matrixEnabled?: boolean;
  onToggleMatrix?: () => void;
}

export function AppHeader({ matrixEnabled = true, onToggleMatrix }: AppHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Portfólio", icon: Briefcase },
    { href: "/#timeline", label: "Carreira", icon: Layers },
    { href: "/#skills", label: "Habilidades", icon: Code2 },
    { href: "/blog", label: "Blog", icon: Terminal },
    { href: "/estante", label: "Estante", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      {/* Régua milimétrica superior */}
      <div className="h-1 w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-zinc-800/40" />

      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-8 py-3.5">
        {/* Identidade / Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-2.5 font-mono text-sm tracking-tight text-zinc-100 transition-colors hover:text-cyan-400"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-xs font-bold text-cyan-400 group-hover:border-cyan-500/50">
            LR
          </span>
          <div className="flex flex-col">
            <span className="font-semibold leading-none">lucas ribeiro</span>
            <span className="text-[10px] text-zinc-400">frontend engineer</span>
          </div>
        </Link>

        {/* Links Desktop */}
        <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href) && !link.href.includes("#");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-zinc-900 text-cyan-400 border border-zinc-800"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Ações / Toggle Matrix FX */}
        <div className="flex items-center space-x-3">
          {onToggleMatrix && (
            <button
              onClick={onToggleMatrix}
              type="button"
              title="Alternar efeito Matrix de fundo"
              className={`flex items-center space-x-1.5 rounded border px-2.5 py-1 font-mono text-xs transition-colors ${
                matrixEnabled
                  ? "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-300"
                  : "border-zinc-800 bg-zinc-950 text-zinc-600 hover:text-zinc-400"
              }`}
            >
              <Sparkles className={`h-3 w-3 ${matrixEnabled ? "text-cyan-400" : "text-zinc-600"}`} />
              <span className="hidden sm:inline">Matrix FX:</span>
              <span className={matrixEnabled ? "text-emerald-400 font-bold" : "text-zinc-600"}>
                {matrixEnabled ? "ON" : "OFF"}
              </span>
            </button>
          )}

          {/* Botão Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded border border-zinc-800 text-zinc-400 hover:text-zinc-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 rounded px-3 py-2 font-mono text-sm text-zinc-300 hover:bg-zinc-900 hover:text-cyan-400"
            >
              <link.icon className="h-4 w-4 text-zinc-500" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
