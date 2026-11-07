import type { Metadata } from "next";
import { shelfItems } from "@/data/shelf";
import { ShelfFilter } from "@/components/ShelfFilter";
import { BookOpen, Book, Film, Tv, Gamepad2, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "A Estante — Livros, Filmes, Séries e Jogos — Lucas Ribeiro",
  description: "Catálogo cultural de livros, filmes, séries e jogos favoritos com notas e resenhas críticas.",
};

export default function ShelfPage() {
  const booksCount = shelfItems.filter((i) => i.category === "livro").length;
  const moviesCount = shelfItems.filter((i) => i.category === "filme").length;
  const seriesCount = shelfItems.filter((i) => i.category === "serie").length;
  const gamesCount = shelfItems.filter((i) => i.category === "jogo").length;
  const favoritesCount = shelfItems.filter((i) => i.status === "favorito").length;

  return (
    <div className="space-y-10 py-4">
      {/* Cabeçalho da Estante */}
      <div className="border-b border-zinc-900 pb-8 space-y-4">
        <div className="inline-flex items-center space-x-2 rounded border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-xs text-cyan-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>INDEX // CULTURAL ARCHIVE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          A Estante Cultural
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Um arquivo pessoal com livros, filmes, séries e jogos que marcaram minha trajetória.
          Obras com resenha completa contêm link direto para o caderno/blog.
        </p>

        {/* Estatísticas Rápidas da Estante */}
        <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
          <span className="flex items-center space-x-1.5 rounded border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-zinc-300">
            <Book className="h-3 w-3 text-cyan-400" />
            <span>{booksCount} Livros</span>
          </span>

          <span className="flex items-center space-x-1.5 rounded border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-zinc-300">
            <Film className="h-3 w-3 text-cyan-400" />
            <span>{moviesCount} Filmes</span>
          </span>

          <span className="flex items-center space-x-1.5 rounded border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-zinc-300">
            <Tv className="h-3 w-3 text-cyan-400" />
            <span>{seriesCount} Séries</span>
          </span>

          <span className="flex items-center space-x-1.5 rounded border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-zinc-300">
            <Gamepad2 className="h-3 w-3 text-cyan-400" />
            <span>{gamesCount} Jogos</span>
          </span>

          <span className="flex items-center space-x-1.5 rounded border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-amber-300 font-semibold">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span>{favoritesCount} Obras Favoritas</span>
          </span>
        </div>
      </div>

      {/* Componente Interativo de Filtros e Busca da Estante */}
      <ShelfFilter items={shelfItems} />
    </div>
  );
}
