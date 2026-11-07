import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost, PostCategory } from "@/types";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        category: (data.category as PostCategory) || "tech",
        tags: data.tags || [],
        featured: Boolean(data.featured),
        readingTime: data.readingTime || "4 min de leitura",
        cover: data.cover || undefined,
      };
    });

  // Ordenar por data decrescente
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    category: (data.category as PostCategory) || "tech",
    tags: data.tags || [],
    featured: Boolean(data.featured),
    readingTime: data.readingTime || "4 min de leitura",
    cover: data.cover || undefined,
    contentHtml,
  };
}
