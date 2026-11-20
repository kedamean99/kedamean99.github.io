export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. Re-framed blog URLs: /blog/sedot-wc-... -> /blog/profil-sanitasi-...
  if (path.startsWith("/blog/sedot-wc-")) {
    const newPath = path.replace(/^\/blog\/sedot-wc-/, "/blog/profil-sanitasi-");
    const target = newPath.endsWith("/") ? newPath : `${newPath}/`;
    return Response.redirect(`${url.origin}${target}`, 301);
  }

  // 2. Double-slug cities: /sedot-wc-[city]-[city] -> /sedot-wc-[city]/
  const doubleMatch = path.match(/^\/sedot-wc-([a-z]+)-\1\/?$/);
  if (doubleMatch) {
    return Response.redirect(`${url.origin}/sedot-wc-${doubleMatch[1]}/`, 301);
  }

  // 3. Sumenep deleted island districts -> /sedot-wc-sumenep/
  const islands = ["arjasa", "gayam", "giligenteng", "kangayan", "masalembu", "nonggunong", "raas", "sapeken", "talango"];
  for (const isl of islands) {
    if (path.startsWith(`/sedot-wc-${isl}-sumenep`)) {
      return Response.redirect(`${url.origin}/sedot-wc-sumenep/`, 301);
    }
  }

  return context.next();
}
