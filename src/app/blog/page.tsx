import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogFilter } from "@/components/BlogFilter";
import { Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Caderno Público — Lucas Ribeiro",
  description: "Artigos sobre arquitetura frontend, web performance, design systems e ensaios pessoais.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10 py-4">
      {/* Cabeçalho da página */}
      <div className="border-b border-zinc-900 pb-8">
        <div className="inline-flex items-center space-x-2 rounded border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-xs text-cyan-400 mb-4">
          <Terminal className="h-3.5 w-3.5" />
          <span>INDEX // ARTICLES & NOTES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          Caderno Público & Artigos
        </h1>

        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Um espaço sem algoritmo dedicado à escrita técnica, reflexões sobre o ofício da engenharia
          de front-end e resenhas críticas de obras culturais.
        </p>
      </div>

      {/* Filtro de Posts: Destaque + Todos os Posts */}
      <BlogFilter posts={posts} />
    </div>
  );
}
