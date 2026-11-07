# personal-hub

Hub pessoal integrado de **Lucas Ribeiro** combinando **Portfólio Frontend**, **Blog Editorial (Tech & Pessoal)** e **Estante Cultural (Livros, Filmes, Séries e Jogos)**.

Construído com estética sóbria preto e branco, acentos técnicos (ciano e esmeralda), réguas blueprint de largura total (100vw), margens arquiteturais e cascata de caracteres Matrix prateada em 3D.

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack, React 19)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com) + [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- **Animações**: [Motion](https://motion.dev) (Framer Motion)
- **Efeito Visual**: HTML5 Canvas 2D (`requestAnimationFrame`) com 3 camadas de profundidade (Silver Matrix Rain)
- **Ícones**: [Lucide React](https://lucide.dev)
- **Blog Engine**: Markdown nativo com `gray-matter` e `remark`

---

## 📐 Estrutura do Projeto

```
lks-site/
├── src/
│   ├── app/
│   │   ├── blog/              # Listagem com destaques, filtros e busca
│   │   ├── blog/[slug]/       # Leitor de artigos em Markdown
│   │   ├── estante/           # Catálogo cultural (livros, filmes, séries, jogos)
│   │   ├── globals.css        # Tokens de design e réguas técnicas
│   │   ├── layout.tsx         # Layout raiz com metadados
│   │   └── page.tsx           # Homepage (Hero, Timeline, Habilidades, Destaques)
│   ├── components/            # Componentes visuais e interativos
│   │   ├── MatrixRain.tsx     # Cascata Matrix prateada 3D
│   │   ├── RulerDivider.tsx   # Réguas horizontais 100vw
│   │   ├── RulerLayout.tsx    # Margens verticais contínuas
│   │   ├── CareerTimeline.tsx # Linha do tempo de carreira
│   │   ├── TechConcepts.tsx   # Habilidades e conceitos de frontend
│   │   ├── BlogFilter.tsx     # Filtro e busca de posts
│   │   └── ShelfFilter.tsx    # Filtro cultural com status e notas
│   ├── content/blog/          # Artigos em Markdown (.md)
│   ├── data/                  # Dados estruturados (timeline, shelf, concepts)
│   └── lib/                   # Utilitários de leitura do servidor
```

---

## 🚀 Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Iniciar servidor local
pnpm dev

# Build de produção
pnpm build
pnpm start
```
