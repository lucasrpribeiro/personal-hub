import Link from "next/link";
import { BlogPost } from "@/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  const categoryBadgeColors = {
    tech: "border-cyan-500/30 text-cyan-400 bg-cyan-950/20",
    pessoal: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20",
    review: "border-purple-500/30 text-purple-400 bg-purple-950/20",
  };

  return (
    <article className="group relative rounded border border-zinc-900 bg-zinc-950/50 p-5 transition-all hover:border-zinc-800 hover:bg-zinc-900/40">
      <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
        <span
          className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
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

      <h4 className="mt-3 text-base sm:text-lg font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
        <Link href={`/blog/${post.slug}`}>
          <span className="absolute inset-0" aria-hidden="true" />
          {post.title}
        </Link>
      </h4>

      <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
        {post.description}
      </p>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-zinc-900/60">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <span className="font-mono text-xs text-zinc-400 group-hover:text-cyan-400 flex items-center space-x-1">
          <span>Acessar</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </article>
  );
}
