import { TechConceptCategory } from "@/types";

export const techConceptCategories: TechConceptCategory[] = [
  {
    title: "Performance & Web Vitals",
    description: "Engenharia de carregamento rápido, métricas reais de usuário (RUM) e execução eficiente no navegador.",
    concepts: [
      {
        name: "Core Web Vitals (INP, LCP, CLS)",
        description: "Otimização de Interaction to Next Paint com quebra de long tasks e priorização de renderização no thread principal.",
        tags: ["INP", "LCP", "CLS", "RUM", "Web-Vitals API"],
      },
      {
        name: "Bundle Optimization & Code Splitting",
        description: "Análise de árvores de dependência, tree-shaking agressivo, dynamic imports e separação de chunks críticos.",
        tags: ["Tree-shaking", "Dynamic Import", "Vite", "Turbopack"],
      },
      {
        name: "Off-thread Processing & Web Workers",
        description: "Delegação de cálculos pesados, parsers de arquivos e processamento em segundo plano sem travar a interface.",
        tags: ["Web Workers", "Comlink", "OffscreenCanvas", "WebAssembly"],
      },
    ],
  },
  {
    title: "Arquitetura & Renderização",
    description: "Paradigmas modernos de entrega de código, divisão de responsabilidade entre cliente e servidor.",
    concepts: [
      {
        name: "RSC & Streaming SSR",
        description: "React Server Components e Suspense para streaming de HTML progressivo com hidratação seletiva.",
        tags: ["RSC", "Suspense", "Streaming", "Partial Prerendering"],
      },
      {
        name: "Modelos de Estado & Reatividade",
        description: "Gerenciamento previsível: Estado servidor (TanStack Query), estado global atômico (Zustand) e Signals.",
        tags: ["Zustand", "Signals", "State Machines", "Server State"],
      },
      {
        name: "Micro-frontends & Monorepos",
        description: "Estruturas escaláveis com Module Federation ou monorepos gerenciados por Turborepo e pnpm workspaces.",
        tags: ["Turborepo", "Module Federation", "pnpm", "CI/CD"],
      },
    ],
  },
  {
    title: "Design Systems & CSS Engineering",
    description: "Construção de ecossistemas visuais acessíveis, consistentes e performáticos com tokens de design.",
    concepts: [
      {
        name: "Design Tokens & Variáveis CSS",
        description: "Arquitetura de temas dinâmicos (Light/Dark/High Contrast) mapeados em tokens semânticos e CSS moderno.",
        tags: ["Design Tokens", "CSS Variables", "Tailwind CSS", "OKLCH"],
      },
      {
        name: "Acessibilidade (WCAG 2.2 AAA)",
        description: "Semântica estrita de ARIA, navegação via teclado, armadilhas de foco acessíveis e testes com leitores de tela.",
        tags: ["A11y", "ARIA", "Focus Management", "Screen Readers"],
      },
      {
        name: "Componentes Primitivos & Headless",
        description: "Separação entre lógica de comportamento/acessibilidade e estilização visual através de padrões headless.",
        tags: ["Radix UI", "Headless UI", "Compound Components"],
      },
    ],
  },
  {
    title: "Tipagem & Segurança em Runtime",
    description: "Garantia de integridade de dados da borda até o componente final com validação em tempo de compilação e execução.",
    concepts: [
      {
        name: "TypeScript Estrito & Type-Level Programming",
        description: "Modelagem precisa de tipos com Generics avançados, Template Literal Types e Discriminated Unions.",
        tags: ["Generics", "Type Narrowing", "Template Literals"],
      },
      {
        name: "Validação de Esquemas (Zod / Valibot)",
        description: "Contratos de API seguros e parsing de respostas na borda com inferência automática de tipos em TypeScript.",
        tags: ["Zod", "Valibot", "API Contracts", "Type Inference"],
      },
    ],
  },
];
