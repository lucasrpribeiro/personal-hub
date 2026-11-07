import Link from "next/link";
import { BlogPost } from "@/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/BorderBeam";

interface FeaturedPostCardProps {
  post: BlogPost;
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const categoryBadgeColors = {
    tech: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20",
    pessoal: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
    review: "border-purple-500/40 text-purple-400 bg-purple-950/20",
  };

  return (
    <article className="group relative overflow-hidden rounded border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8 transition-all hover:border-zinc-700 hover:shadow-2xl">
      {/* Luminous Border Beam no Card de Destaque */}
      <BorderBeam
        size={220}
        duration={14}
        colorFrom="#38bdf8"
        colorTo="#e2e8f0"
        borderWidth={1.5}
      />

      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
        <span className="rounded border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
          ★ Destaque Principal
        </span>

        <span
          className={`rounded border px-2 py-0.5 text-[11px] uppercase tracking-wider ${
            categoryBadgeColors[post.category] || categoryBadgeColors.tech
          }`}
        >
          {post.category}
        </span>

        <span className="flex items-center text-zinc-400 text-[11px]">
          <Calendar className="mr-1 h-3 w-3" />
          {post.date}
        </span>

        <span className="flex items-center text-zinc-400 text-[11px]">
          <Clock className="mr-1 h-3 w-3" />
          {post.readingTime}
        </span>
      </div>

      <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-cyan-400 transition-colors">
        <Link href={`/blog/${post.slug}`} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-2xl">
        {post.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-zinc-900 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-1 font-mono text-xs text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
          <span>Ler artigo</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </article>
  );
}
