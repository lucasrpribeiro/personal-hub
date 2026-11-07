"use client";

import { useState, useMemo } from "react";
import { ShelfItem, ShelfCategory } from "@/types";
import { ShelfCard } from "./ShelfCard";
import { Search, Book, Film, Tv, Gamepad2, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ShelfFilterProps {
  items: ShelfItem[];
}

export function ShelfFilter({ items }: ShelfFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<ShelfCategory | "all">("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "Todos", icon: Layers },
    { id: "livro", label: "Livros", icon: Book },
    { id: "filme", label: "Filmes", icon: Film },
    { id: "serie", label: "Séries", icon: Tv },
    { id: "jogo", label: "Jogos", icon: Gamepad2 },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filtro de categoria
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Filtro de favoritos
      if (onlyFavorites && item.status !== "favorito") {
        return false;
      }
      // Busca por texto
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCreator = item.creator.toLowerCase().includes(query);
        const matchesTags = item.tags.some((tag) => tag.toLowerCase().includes(query));
        return matchesTitle || matchesCreator || matchesTags;
      }
      return true;
    });
  }, [items, selectedCategory, onlyFavorites, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
        {/* Abas de Categorias */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ShelfCategory | "all")}
                className={`flex items-center space-x-1.5 rounded px-3 py-1.5 transition-all ${
                  isSelected
                    ? "bg-zinc-800 text-cyan-400 border border-zinc-700 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Busca e Toggle de Favoritos */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`rounded px-2.5 py-1.5 font-mono text-xs transition-colors border ${
              onlyFavorites
                ? "border-amber-500/50 bg-amber-500/10 text-amber-300 font-semibold"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            ★ Apenas Favoritos
          </button>

          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar obra ou tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-zinc-800 bg-zinc-950/80 pl-8 pr-3 py-1.5 font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Grid de Itens da Estante com Animação */}
      {filteredItems.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ShelfCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="rounded border border-dashed border-zinc-800 p-12 text-center">
          <p className="font-mono text-sm text-zinc-400">
            Nenhuma obra encontrada para os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}
