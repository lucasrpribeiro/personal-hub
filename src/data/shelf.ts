import { ShelfItem } from "@/types";

export const shelfItems: ShelfItem[] = [
  // Livros
  {
    id: "livro-neuromancer",
    title: "Neuromancer",
    creator: "William Gibson",
    year: 1984,
    category: "livro",
    status: "favorito",
    rating: 5,
    comment:
      "A gênese do cyberpunk e a maior influência estética do nosso imaginário digital. A prosa estilizada de Gibson é pura poesia tecnológica.",
    tags: ["Cyberpunk", "Ficção Científica", "Clássico"],
    reviewSlug: "review-neuromancer",
  },
  {
    id: "livro-designing-data",
    title: "Designing Data-Intensive Applications",
    creator: "Martin Kleppmann",
    year: 2017,
    category: "livro",
    status: "lido",
    rating: 5,
    comment:
      "O livro definitivo sobre sistemas distribuídos, confiabilidade, consistência e armazenamento de dados. Leitura obrigatória para qualquer engenheiro.",
    tags: ["Sistemas Distribuídos", "Arquitetura", "Engenharia"],
  },
  {
    id: "livro-clean-code",
    title: "The Pragmatic Programmer",
    creator: "Andrew Hunt & David Thomas",
    year: 2019,
    category: "livro",
    status: "lido",
    rating: 5,
    comment:
      "Filosofia prática sobre o ofício do desenvolvimento de software: como pensar com clareza, assumir responsabilidade e manter código flexível.",
    tags: ["Boas Práticas", "Carreira", "Engenharia"],
  },
  {
    id: "livro-snow-crash",
    title: "Snow Crash",
    creator: "Neal Stephenson",
    year: 1992,
    category: "livro",
    status: "em_andamento",
    rating: 4,
    comment:
      "Onde nasceu o conceito de 'Metaverso'. Crítica satírica ácida e ritmo alucinante sobre corporações, linguística e computação.",
    tags: ["Cyberpunk", "Distopia", "Linguística"],
  },

  // Filmes
  {
    id: "filme-blade-runner-2049",
    title: "Blade Runner 2049",
    creator: "Denis Villeneuve",
    year: 2017,
    category: "filme",
    status: "favorito",
    rating: 5,
    comment:
      "Obra-prima audiovisual com fotografia de Roger Deakins. Explora o que significa ter uma alma através de lentes filosóficas e design sonoro denso.",
    tags: ["Cyberpunk", "Sci-Fi", "Fotografia"],
    reviewSlug: "review-blade-runner-2049",
  },
  {
    id: "filme-the-matrix",
    title: "The Matrix",
    creator: "Lana & Lilly Wachowski",
    year: 1999,
    category: "filme",
    status: "favorito",
    rating: 5,
    comment:
      "Redefiniu o cinema de ação e a filosofia moderna na virada do milênio. A inspiração direta para a estética de cascata prateada deste site.",
    tags: ["Clássico", "Filosofia", "Hacker Culture"],
  },
  {
    id: "filme-ex-machina",
    title: "Ex Machina",
    creator: "Alex Garland",
    year: 2014,
    category: "filme",
    status: "assistido",
    rating: 5,
    comment:
      "Suspense claustrofóbico e cirúrgico sobre inteligência artificial, teste de Turing e a ética da consciência sintética.",
    tags: ["Inteligência Artificial", "Suspense", "Minimalismo"],
  },

  // Séries
  {
    id: "serie-mr-robot",
    title: "Mr. Robot",
    creator: "Sam Esmail",
    year: 2015,
    category: "serie",
    status: "favorito",
    rating: 5,
    comment:
      "A representação mais realista e precisa de segurança da informação e engenharia reversa na televisão, combinada com direção de arte impecável.",
    tags: ["Hacking", "Psicológico", "Cybersecurity"],
  },
  {
    id: "serie-severance",
    title: "Severance (Ruptura)",
    creator: "Dan Erickson",
    year: 2022,
    category: "serie",
    status: "favorito",
    rating: 5,
    comment:
      "Distopia corporativa fascinante com design de produção minimalista dos anos 70/80 e comentários profundos sobre equilíbrio vida-trabalho.",
    tags: ["Mistério", "Sci-Fi", "Corporativo"],
  },
  {
    id: "serie-dark",
    title: "Dark",
    creator: "Baran bo Odar & Jantje Friese",
    year: 2017,
    category: "serie",
    status: "assistido",
    rating: 5,
    comment:
      "O quebra-cabeça narrativo mais bem amarrado já produzido sobre viagens no tempo, paradoxos bootstrap e determinismo cósmico.",
    tags: ["Sci-Fi", "Viagem no Tempo", "Complexidade"],
  },

  // Jogos
  {
    id: "jogo-cyberpunk-2077",
    title: "Cyberpunk 2077 (Phantom Liberty)",
    creator: "CD Projekt Red",
    year: 2020,
    category: "jogo",
    status: "favorito",
    rating: 5,
    comment:
      "Night City é a cidade digital mais detalhada e viva já construída. A expansão Phantom Liberty eleva a narrativa a um thriller de espionagem estelar.",
    tags: ["RPG", "Cyberpunk", "Ray Tracing"],
  },
  {
    id: "jogo-elden-ring",
    title: "Elden Ring",
    creator: "FromSoftware",
    year: 2022,
    category: "jogo",
    status: "jogado",
    rating: 5,
    comment:
      "Design de mundo e exploração no ápice da indústria de jogos. Conquista e recompensa através da curiosidade sem mapa guiado.",
    tags: ["Action RPG", "Fantasia Sombria", "Game Design"],
  },
  {
    id: "jogo-the-witcher-3",
    title: "The Witcher 3: Wild Hunt",
    creator: "CD Projekt Red",
    year: 2015,
    category: "jogo",
    status: "jogado",
    rating: 5,
    comment:
      "Narrativa inigualável e escolhas morais em tons de cinza. As missões secundárias têm mais profundidade do que a maioria dos jogos inteiros.",
    tags: ["RPG", "Narrativa", "Fantasia"],
  },
  {
    id: "jogo-half-life-2",
    title: "Half-Life 2",
    creator: "Valve",
    year: 2004,
    category: "jogo",
    status: "favorito",
    rating: 5,
    comment:
      "Marco histórico do design de jogos em primeira pessoa e física de ambiente com a Source Engine. Atemporal.",
    tags: ["FPS", "Física", "Clássico"],
  },
];
