import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { CareerTimeline } from "@/components/CareerTimeline";
import { TechConcepts } from "@/components/TechConcepts";
import { RulerDivider } from "@/components/RulerDivider";
import { FeaturedPostCard } from "@/components/FeaturedPostCard";
import { PostCard } from "@/components/PostCard";
import { ShelfCard } from "@/components/ShelfCard";
import { getAllPosts } from "@/lib/blog";
import { shelfItems } from "@/data/shelf";
import { ArrowRight, Terminal, BookOpen } from "lucide-react";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];
  const recentPosts = allPosts.filter((p) => p.slug !== featuredPost?.slug).slice(0, 2);

  // Selecionar itens favoritos da estante para a home
  const highlightShelfItems = shelfItems.filter((item) => item.status === "favorito").slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 1. HERO / TERMINAL POSITIONING */}
      <HeroSection />

      {/* 2. RÉGUA: EXPERIÊNCIAS & CARREIRA */}
      <RulerDivider tag="01 // EXP" label="Linha do Tempo de Carreira" />
      <CareerTimeline />

      {/* 3. RÉGUA: HABILIDADES & CONCEITOS FRONTEND */}
      <RulerDivider tag="02 // SKILLS" label="Conceitos & Arquitetura Frontend" />
      <TechConcepts />

      {/* 4. RÉGUA: BLOG & ENSAIOS */}
      <RulerDivider tag="03 // BLOG" label="Caderno Público & Artigos" />
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-cyan-400" />
              <span>Publicações & Ensaios</span>
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Escritos sobre arquitetura web, design minimalista e experiências de vida.
            </p>
          </div>

          <Link
            href="/blog"
            className="flex items-center space-x-1.5 font-mono text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Ver arquivo completo ({allPosts.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Post em Destaque */}
        {featuredPost && <FeaturedPostCard post={featuredPost} />}

        {/* Posts Recentes */}
        {recentPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 5. RÉGUA: ESTANTE CULTURAL */}
      <RulerDivider tag="04 // SHELF" label="Estante Cultural & Referências" />
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-cyan-400" />
              <span>A Estante</span>
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Livros, filmes, séries e jogos que moldaram meu pensamento e imaginação.
            </p>
          </div>

          <Link
            href="/estante"
            className="flex items-center space-x-1.5 font-mono text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Ver toda a estante ({shelfItems.length} obras)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Destaques da Estante */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlightShelfItems.map((item) => (
            <ShelfCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
