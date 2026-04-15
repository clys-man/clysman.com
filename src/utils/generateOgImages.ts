import { Resvg } from "@resvg/resvg-js";
import type { BlogEntry } from "@/types";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: BlogEntry) {
  // og-templates/post expects data shape compatible with both collections
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await postOgImage(post as any);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}
