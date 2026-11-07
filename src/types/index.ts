export type PostCategory = "tech" | "pessoal" | "review";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: PostCategory;
  tags: string[];
  featured?: boolean;
  cover?: string;
  readingTime?: string;
  contentHtml?: string;
}

export type ShelfCategory = "livro" | "filme" | "serie" | "jogo";
export type ShelfStatus = "lido" | "assistido" | "jogado" | "em_andamento" | "favorito";

export interface ShelfItem {
  id: string;
  title: string;
  creator: string; // Autor, Diretor ou Estúdio
  year: number;
  category: ShelfCategory;
  status: ShelfStatus;
  rating: number; // 1 a 5
  comment: string;
  tags: string[];
  reviewSlug?: string; // Link para o post de review no blog
}

export interface CareerExperience {
  period: string;
  role: string;
  company: string;
  location?: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface TechConceptCategory {
  title: string;
  description: string;
  concepts: {
    name: string;
    description: string;
    tags: string[];
  }[];
}
