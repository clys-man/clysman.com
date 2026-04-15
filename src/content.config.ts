import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PT_PATH = "src/data/blog/pt";
export const BLOG_EN_PATH = "src/data/blog/en";

/** @deprecated Use BLOG_PT_PATH or BLOG_EN_PATH */
export const BLOG_PATH = BLOG_PT_PATH;

const blogSchema = ({ image }: { image: () => z.ZodType<unknown> }) =>
  z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image().or(z.string()).optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
    hideEditPost: z.boolean().optional(),
    timezone: z.string().optional(),
  });

const blog_pt = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PT_PATH}` }),
  schema: blogSchema,
});

const blog_en = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_EN_PATH}` }),
  schema: blogSchema,
});

export const collections = { blog_pt, blog_en };
