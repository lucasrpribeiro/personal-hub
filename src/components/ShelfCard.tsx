import Link from "next/link";
import { ShelfItem } from "@/types";
import { Book, Film, Tv, Gamepad2, Star, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface ShelfCardProps {
  item: ShelfItem;
}

const categoryIcons = {
  livro: Book,
  filme: Film,
  serie: Tv,
  jogo: Gamepad2,
};

const statusLabels: Record<string, { label: string; color: string }> = {
  favorito: { label: "Favorito ★", color: "border-amber-500/40 text-amber-300 bg-amber-950/20" },
  lido: { label: "Lido", color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20" },
  assistido: { label: "Assistido", color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20" },
  jogado: { label: "Concluído", color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20" },
  em_andamento: { label: "Em andamento", color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/20" },
};

export function ShelfCard({ item }: ShelfCardProps) {
  const Icon = categoryIcons[item.category] || Book;
  const statusInfo = statusLabels[item.status] || {
    label: item.status,
    color: "border-zinc-800 text-zinc-400",
  };

  return (
    <div className="flex flex-col justify-between rounded border border-zinc-900 bg-zinc-950/70 p-5 transition-all hover:border-zinc-800 hover:bg-zinc-900/30">
      <div>
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded border border-zinc-800 bg-zinc-900 text-cyan-400">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              {item.category} • {item.year}
            </span>
          </div>

          <span
            className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusInfo.color}`}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* Título e Criador */}
        <div className="mt-3.5">
          <h4 className="text-base font-bold text-zinc-100">{item.title}</h4>
          <p className="text-xs font-mono text-zinc-400">{item.creator}</p>
        </div>

        {/* Avaliação em Estrelas */}
        <div className="mt-2.5 flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < item.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-zinc-800 text-zinc-800"
              }`}
            />
          ))}
          <span className="ml-1.5 font-mono text-[10px] text-zinc-400">
            {item.rating}/5
          </span>
        </div>

        {/* Comentário pessoal */}
        <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
          &ldquo;{item.comment}&rdquo;
        </p>
      </div>

      {/* Rodapé: Tags e Link para Review no Blog (se existir) */}
      <div className="mt-4 pt-3 border-t border-zinc-900/80 flex flex-col space-y-2.5">
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-zinc-900/80 px-1.5 py-0.2 font-mono text-[10px] text-zinc-400 border border-zinc-900"
            >
              #{tag}
            </span>
          ))}
        </div>

        {item.reviewSlug && (
          <Link
            href={`/blog/${item.reviewSlug}`}
            className="inline-flex items-center justify-between rounded border border-cyan-500/30 bg-cyan-950/20 px-2.5 py-1.5 font-mono text-xs font-semibold text-cyan-300 transition-colors hover:border-cyan-400 hover:bg-cyan-900/30 hover:text-cyan-200"
          >
            <span>Ler review no blog</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
          </Link>
        )}
      </div>
    </div>
  );
}
