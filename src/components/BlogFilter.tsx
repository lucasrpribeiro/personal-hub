"use client";

import { useState, useMemo } from "react";
import { BlogPost, PostCategory } from "@/types";
import { FeaturedPostCard } from "./FeaturedPostCard";
import { PostCard } from "./PostCard";
import { Search, Terminal, User, BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BlogFilterProps {
  posts: BlogPost[];
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  const categories = [
    { id: "all", label: "Todos", icon: Layers },
    { id: "tech", label: "Tecnologia", icon: Terminal },
    { id: "pessoal", label: "Pessoal & Caderno", icon: User },
    { id: "review", label: "Reviews da Estante", icon: BookOpen },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory !== "all" && post.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDesc = post.description.toLowerCase().includes(query);
        const matchesTag = post.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesTag;
      }
      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-16">
      {/* 1. SEÇÃO DE POSTS PRINCIPAIS (Destaque) */}
      {featuredPost && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              // [01] Post em Destaque
            </span>
          </div>
          <FeaturedPostCard post={featuredPost} />
        </section>
      )}

      {/* 2. SEÇÃO DE TODOS OS POSTS (Com Filtros e Busca) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div>
            <h3 className="text-xl font-bold text-zinc-100 flex items-center space-x-2">
              <span>Arquivo & Todos os Artigos</span>
              <span className="rounded bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-400">
                {filteredPosts.length}
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Reflexões técnicas, anotações de engenharia e ensaios pessoais.
            </p>
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Filtrar por título ou tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-zinc-800 bg-zinc-950/80 pl-8 pr-3 py-1.5 font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Abas de Categorias */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as PostCategory | "all")}
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

        {/* Lista de Cards */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="rounded border border-dashed border-zinc-800 p-12 text-center">
            <p className="font-mono text-sm text-zinc-400">
              Nenhum artigo encontrado com esse filtro.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
