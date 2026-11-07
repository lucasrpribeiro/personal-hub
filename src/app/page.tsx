import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { CareerTimeline } from "@/components/CareerTimeline";
import { TechConcepts } from "@/components/TechConcepts";
import { RulerDivider } from "@/components/RulerDivider";
import { FeaturedPostCard } from "@/components/FeaturedPostCard";
import { PostCard } from "@/components/PostCard";
import { ShelfCard } from "@/components/ShelfCard";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { MorphingText } from "@/components/ui/MorphingText";
import { getAllPosts } from "@/lib/blog";
import { shelfItems } from "@/data/shelf";
import { Terminal, BookOpen } from "lucide-react";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];
  const recentPosts = allPosts.filter((p) => p.slug !== featuredPost?.slug).slice(0, 2);

  // Selecionar itens favoritos da estante para a home
  const highlightShelfItems = shelfItems.filter((item) => item.status === "favorito").slice(0, 3);

  const shelfMorphKeywords = [
    "Ficção Cyberpunk",
    "Sistemas Distribuídos",
    "Filmes de Denis Villeneuve",
    "Séries Distópicas",
    "RPGs e Imersão",
  ];

  return (
    <div className="space-y-6">
      {/* 1. HERO COM WARP BACKGROUND, TERMINAL, BORDER BEAM, MORPHING TEXT E INTERACTIVE HOVER BUTTONS */}
      <HeroSection />

      {/* 2. RÉGUA: EXPERIÊNCIAS & CARREIRA (Com Border Beam na posição ativa) */}
      <RulerDivider tag="01 // EXP" label="Linha do Tempo de Carreira" />
      <CareerTimeline />

      {/* 3. RÉGUA: HABILIDADES & CONCEITOS FRONTEND (Com Dither Field e Border Beam) */}
      <RulerDivider tag="02 // SKILLS" label="Conceitos & Arquitetura Frontend" />
      <TechConcepts />

      {/* 4. RÉGUA: BLOG & ENSAIOS (Com Featured Card + Border Beam + Interactive Hover Button) */}
      <RulerDivider tag="03 // BLOG" label="Caderno Público & Artigos" />
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-cyan-400" />
              <span>Publicações & Ensaios</span>
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Escritos sobre arquitetura web, design minimalista e experiências de vida.
            </p>
          </div>

          <InteractiveHoverButton
            text={`Ver Arquivo Completo (${allPosts.length})`}
            href="/blog"
            variant="cyan"
          />
        </div>

        {/* Post em Destaque com Border Beam */}
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

      {/* 5. RÉGUA: ESTANTE CULTURAL (Com Morphing Text no subtítulo + Interactive Hover Button) */}
      <RulerDivider tag="04 // SHELF" label="Estante Cultural & Referências" />
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-cyan-400" />
              <span>A Estante</span>
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Acervo de{" "}
              <span className="text-cyan-400 font-semibold">
                <MorphingText texts={shelfMorphKeywords} interval={3500} />
              </span>{" "}
              que moldaram minha visão.
            </p>
          </div>

          <InteractiveHoverButton
            text={`Explorar Toda a Estante (${shelfItems.length})`}
            href="/estante"
            variant="emerald"
          />
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
