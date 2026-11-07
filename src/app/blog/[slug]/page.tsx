import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { shelfItems } from "@/data/shelf";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { BorderBeam } from "@/components/ui/BorderBeam";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado — Lucas Ribeiro",
    };
  }

  return {
    title: `${post.title} — Lucas Ribeiro`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedShelfItem = shelfItems.find((item) => item.reviewSlug === post.slug);

  return (
    <article className="py-4 space-y-10 max-w-3xl mx-auto">
      {/* Botão de Retorno com InteractiveHoverButton */}
      <div>
        <InteractiveHoverButton
          text="Voltar para Todos os Artigos"
          href="/blog"
          variant="white"
        />
      </div>

      {/* Cabeçalho do Post */}
      <header className="border-b border-zinc-800 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="rounded border border-cyan-500/40 bg-cyan-950/20 px-2 py-0.5 text-cyan-300 uppercase tracking-wider text-[11px]">
            {post.category}
          </span>

          <span className="flex items-center text-zinc-400">
            <Calendar className="mr-1 h-3.5 w-3.5" />
            {post.date}
          </span>

          <span className="flex items-center text-zinc-400">
            <Clock className="mr-1 h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed pt-2">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Banner de Conexão com a Estante (se for um review) */}
      {relatedShelfItem && (
        <div className="relative overflow-hidden rounded border border-cyan-500/30 bg-cyan-950/20 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-cyan-500/40 bg-cyan-900/40 text-cyan-300">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Obra Catalogada na Estante
              </p>
              <p className="text-sm text-zinc-200">
                {relatedShelfItem.title} — {relatedShelfItem.creator} ({relatedShelfItem.year})
              </p>
            </div>
          </div>

          <Link
            href="/estante"
            className="hidden sm:inline-flex rounded border border-cyan-500/40 px-3 py-1 font-mono text-xs text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            Ver na Estante →
          </Link>

          <BorderBeam size={150} duration={8} colorFrom="#38bdf8" colorTo="#ffffff" />
        </div>
      )}

      {/* Conteúdo Markdown Formatado */}
      <div
        className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed
        prose-headings:text-zinc-100 prose-headings:font-bold prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:border-b prose-h2:border-zinc-900 prose-h2:pb-2 prose-h2:mt-10
        prose-h3:text-xl prose-h3:mt-8
        prose-p:text-base prose-p:leading-relaxed
        prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
        prose-code:font-mono prose-code:text-cyan-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:p-4 prose-pre:rounded
        prose-blockquote:border-l-cyan-400 prose-blockquote:bg-zinc-900/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:text-zinc-300 prose-blockquote:italic
        prose-li:text-zinc-300 prose-ul:my-4 prose-ol:my-4"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
      />

      {/* Rodapé do Post com Navegação */}
      <div className="border-t border-zinc-800 pt-8 mt-16 flex items-center justify-between">
        <InteractiveHoverButton
          text="Retornar ao Blog"
          href="/blog"
          variant="white"
        />

        <Link
          href="/"
          className="font-mono text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
        >
          Ir para a Home //
        </Link>
      </div>
    </article>
  );
}
