import { CareerExperience } from "@/types";

export const careerExperiences: CareerExperience[] = [
  {
    period: "2024 — Presente",
    role: "Senior Frontend Engineer / Tech Lead",
    company: "Tech Architecture & Digital Products",
    location: "Remoto",
    description:
      "Liderança técnica em arquitetura de microsserviços de frontend, governança de design system multimarca e otimização extrema de performance web.",
    achievements: [
      "Redução de 42% no Largest Contentful Paint (LCP) e alcance de nota 98+ em Core Web Vitals em aplicações de alta escala.",
      "Criação e padronização de biblioteca de componentes acessíveis (WCAG AAA) adotada por mais de 6 squads.",
      "Estruturação de pipelines de CI/CD para frontend com testes de regressão visual e bundle analysis automatizado.",
    ],
    skills: ["Next.js", "React 19", "TypeScript", "Design Systems", "Web Performance", "Micro-frontends", "Turbopack"],
  },
  {
    period: "2022 — 2024",
    role: "Frontend Specialist & UI Engineer",
    company: "Scale-up FinTech / SaaS",
    location: "São Paulo, SP (Híbrido)",
    description:
      "Desenvolvimento de interfaces complexas orientadas a dados em tempo real, dashboards com WebSockets e migração de monolito para SSR moderno.",
    achievements: [
      "Migração de SPA legada para Next.js App Router, reduzindo bundle inicial de 1.8MB para 210KB.",
      "Implementação de gráficos interativos com Canvas e SVG capazes de renderizar mais de 50.000 pontos em 60fps.",
      "Mentoria técnica para engenheiros júniores e plenos em boas práticas de TypeScript estrito e reatividade moderna.",
    ],
    skills: ["Vue 3", "Nuxt", "React", "State Machines", "Zustand", "Tailwind CSS", "Canvas API", "Jest / Vitest"],
  },
  {
    period: "2020 — 2022",
    role: "Frontend Developer",
    company: "Digital Studio & Soluções Web",
    location: "São Paulo, SP",
    description:
      "Construção de aplicações web responsivas, portais de alto tráfego e e-commerces com foco em SEO técnico, tipografia e interações fluídas.",
    achievements: [
      "Desenvolvimento de mais de 15 projetos entregues dentro do prazo e com arquitetura escalável.",
      "Adoção pioneira de Tailwind CSS e monorepos com pnpm na equipe, acelerando tempo de entrega de features em 30%.",
    ],
    skills: ["JavaScript Moderno (ES6+)", "CSS Architecture", "Vue.js", "React", "Semantic HTML", "REST APIs", "Git"],
  },
  {
    period: "2018 — 2020",
    role: "Início da Jornada Tech & Web Craft",
    company: "Projetos Independentes & Open Source",
    location: "Brasil",
    description:
      "Fundamentos sólidos de computação, protocolos de internet, algoritmos, manipulação direta de DOM e design gráfico.",
    achievements: [
      "Criação de ferramentas open-source para produtividade de desenvolvedores.",
      "Estudos aprofundados sobre renderização de navegadores, layout engines e tipografia digital.",
    ],
    skills: ["HTML5 / CSS3", "Vanilla JS", "Algoritmos", "UI/UX Design", "Figma", "Linux"],
  },
];
