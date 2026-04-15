import type { CollectionEntry } from "astro:content";

/** Union type covering both language blog collections */
export type BlogEntry = CollectionEntry<"blog_pt"> | CollectionEntry<"blog_en">;
