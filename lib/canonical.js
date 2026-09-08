export const SITE_ORIGIN = "https://innerspiritphoto.com";

/**
 * Build a single canonical URL for the public site.
 * Homepage keeps a trailing slash; all other paths do not.
 * Query strings, hashes, and www are never included.
 */
export function getCanonicalUrl(pathOrUrl = "/") {
  let pathname = "/";

  try {
    if (/^https?:\/\//i.test(pathOrUrl)) {
      pathname = new URL(pathOrUrl).pathname || "/";
    } else {
      pathname = String(pathOrUrl).split("?")[0].split("#")[0] || "/";
    }
  } catch {
    pathname = "/";
  }

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  pathname = pathname.replace(/\/{2,}/g, "/");

  if (pathname !== "/") {
    pathname = pathname.replace(/\/+$/, "");
  }

  if (pathname === "" || pathname === "/") {
    return `${SITE_ORIGIN}/`;
  }

  return `${SITE_ORIGIN}${pathname}`;
}
