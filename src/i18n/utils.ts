import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Returns the localized path for a given lang.
 * Default lang (pt_BR) has no prefix: /posts
 * Other langs get prefixed: /en/posts
 */
export function getLocalizedPath(
  lang: keyof typeof ui,
  path: string
): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === "/" ? "" : path}`;
}

/**
 * Returns the alternate (opposite) language key.
 */
export function getAlternateLang(
  lang: keyof typeof ui
): keyof typeof ui {
  const langs = Object.keys(ui) as (keyof typeof ui)[];
  return langs.find(l => l !== lang) ?? defaultLang;
}

/**
 * Given the current URL, returns the equivalent path in the alternate language.
 */
export function getAlternatePath(url: URL): string {
  const lang = getLangFromUrl(url);
  const alternateLang = getAlternateLang(lang);
  const pathname = url.pathname;

  if (lang === defaultLang) {
    // Going to alternate lang (e.g., en): add /en prefix
    return `/en${pathname === "/" ? "" : pathname}`;
  } else {
    // Going back to default (pt_BR): remove lang prefix
    const withoutLang = pathname.replace(new RegExp(`^/${lang}`), "") || "/";
    return withoutLang;
  }
}
