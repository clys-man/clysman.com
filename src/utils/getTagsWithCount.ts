import type { BlogEntry } from "@/types";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";

interface TagWithCount {
  tag: string;
  tagName: string;
  count: number;
}

const getTagsWithCount = (posts: BlogEntry[]) => {
  const tagsBySlug = new Map<string, TagWithCount>();

  posts.filter(postFilter).forEach(post => {
    post.data.tags.forEach(tagName => {
      const tag = slugifyStr(tagName);
      const currentTag = tagsBySlug.get(tag);

      tagsBySlug.set(tag, {
        tag,
        tagName: currentTag?.tagName ?? tagName,
        count: (currentTag?.count ?? 0) + 1,
      });
    });
  });

  return Array.from(tagsBySlug.values()).sort(
    (tagA, tagB) =>
      tagB.count - tagA.count || tagA.tag.localeCompare(tagB.tag)
  );
};

export default getTagsWithCount;
