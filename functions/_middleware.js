// Cloudflare Pages Functions - Edge Redirect Middleware
// Maps 80 old blog URLs directly to their corresponding transactional landing pages
// Maps 27 double-slug cities and 9 sumenep islands directly to their hubs

const blogToLanding = {
  "sedot-wc-babat": "/sedot-wc-babat-lamongan/",
  "sedot-wc-bancak": "/sedot-wc-bancak-semarang/",
  "sedot-wc-bangsri": "/sedot-wc-bangsri-jepara/",
  "sedot-wc-banyuputih-batang": "/sedot-wc-banyuputih-batang/",
  "sedot-wc-blimbing": "/sedot-wc-blimbing-malang/",
  "sedot-wc-bringin-ngawi": "/sedot-wc-bringin-ngawi/",
  "sedot-wc-bugul-kidul": "/sedot-wc-bugul-kidul-pasuruan/",
  "sedot-wc-bukateja": "/sedot-wc-bukateja-purbalingga/",
  "sedot-wc-bulu-sukoharjo": "/sedot-wc-bulu-sukoharjo/",
  "sedot-wc-candi": "/sedot-wc-candi-sidoarjo/",
  "sedot-wc-cilacap-selatan": "/sedot-wc-cilacap-selatan-cilacap/",
  "sedot-wc-cilacap-utara": "/sedot-wc-cilacap-utara-cilacap/",
  "sedot-wc-comal": "/sedot-wc-comal-pemalang/",
  "sedot-wc-deket": "/sedot-wc-deket-lamongan/",
  "sedot-wc-duduksampeyan": "/sedot-wc-duduksampeyan-gresik/",
  "sedot-wc-gemolong": "/sedot-wc-gemolong-sragen/",
  "sedot-wc-gerokgak": "/sedot-wc-gerokgak-buleleng/",
  "sedot-wc-gubeng": "/sedot-wc-gubeng-surabaya/",
  "sedot-wc-gunem": "/sedot-wc-gunem-rembang/",
  "sedot-wc-jabon": "/sedot-wc-jabon-sidoarjo/",
  "sedot-wc-jatipurno": "/sedot-wc-jatipurno-wonogiri/",
  "sedot-wc-jatiroto-lumajang": "/sedot-wc-jatiroto-lumajang/",
  "sedot-wc-jelbuk": "/sedot-wc-jelbuk-jember/",
  "sedot-wc-jenar": "/sedot-wc-jenar-sragen/",
  "sedot-wc-jiken": "/sedot-wc-jiken-blora/",
  "sedot-wc-jogoroto": "/sedot-wc-jogoroto-jombang/",
  "sedot-wc-kajen": "/sedot-wc-kajen-pekalongan/",
  "sedot-wc-karanganyar-karanganyar": "/sedot-wc-karanganyar/",
  "sedot-wc-karangbinangun": "/sedot-wc-karangbinangun-lamongan/",
  "sedot-wc-kebomas": "/sedot-wc-kebomas-gresik/",
  "sedot-wc-kedungjajang": "/sedot-wc-kedungjajang-lumajang/",
  "sedot-wc-kesesi": "/sedot-wc-kesesi-pekalongan/",
  "sedot-wc-kismantoro": "/sedot-wc-kismantoro-wonogiri/",
  "sedot-wc-klaten-utara": "/sedot-wc-klaten-utara-klaten/",
  "sedot-wc-kota-sumenep": "/sedot-wc-kota-sumenep-sumenep/",
  "sedot-wc-kunduran": "/sedot-wc-kunduran-blora/",
  "sedot-wc-larangan-pamekasan": "/sedot-wc-larangan-pamekasan/",
  "sedot-wc-licin": "/sedot-wc-licin-banyuwangi/",
  "sedot-wc-magersari": "/sedot-wc-magersari-mojokerto/",
  "sedot-wc-mangaran": "/sedot-wc-mangaran-situbondo/",
  "sedot-wc-maos": "/sedot-wc-maos-cilacap/",
  "sedot-wc-menganti": "/sedot-wc-menganti-gresik/",
  "sedot-wc-modung": "/sedot-wc-modung-bangkalan/",
  "sedot-wc-mojoagung": "/sedot-wc-mojoagung-jombang/",
  "sedot-wc-mondokan": "/sedot-wc-mondokan-sragen/",
  "sedot-wc-muncar": "/sedot-wc-muncar-banyuwangi/",
  "sedot-wc-nguling": "/sedot-wc-nguling-pasuruan/",
  "sedot-wc-pangarengan": "/sedot-wc-pangarengan-sampang/",
  "sedot-wc-papar": "/sedot-wc-papar-kediri/",
  "sedot-wc-parang": "/sedot-wc-parang-magetan/",
  "sedot-wc-paranggupito": "/sedot-wc-paranggupito-wonogiri/",
  "sedot-wc-penawangan": "/sedot-wc-penawangan-grobogan/",
  "sedot-wc-petanahan": "/sedot-wc-petanahan-kebumen/",
  "sedot-wc-plaosan": "/sedot-wc-plaosan-magetan/",
  "sedot-wc-plemahan": "/sedot-wc-plemahan-kediri/",
  "sedot-wc-prambon-nganjuk": "/sedot-wc-prambon-nganjuk/",
  "sedot-wc-pujer": "/sedot-wc-pujer-bondowoso/",
  "sedot-wc-purwosari-pasuruan": "/sedot-wc-purwosari-pasuruan/",
  "sedot-wc-rungkut": "/sedot-wc-rungkut-surabaya/",
  "sedot-wc-sanankulon": "/sedot-wc-sanankulon-blitar/",
  "sedot-wc-saradan": "/sedot-wc-saradan-madiun/",
  "sedot-wc-selomerto": "/sedot-wc-selomerto-wonosobo/",
  "sedot-wc-semboro": "/sedot-wc-semboro-jember/",
  "sedot-wc-sidoarjo": "/sedot-wc-sidoarjo/",
  "sedot-wc-sidorejo-magetan": "/sedot-wc-sidorejo-magetan/",
  "sedot-wc-sigaluh": "/sedot-wc-sigaluh-banjarnegara/",
  "sedot-wc-sirampog": "/sedot-wc-sirampog-brebes/",
  "sedot-wc-sooko-mojokerto": "/sedot-wc-sooko-mojokerto/",
  "sedot-wc-sukoharjo": "/sedot-wc-sukoharjo/",
  "sedot-wc-sukomoro-magetan": "/sedot-wc-sukomoro-magetan/",
  "sedot-wc-tangen": "/sedot-wc-tangen-sragen/",
  "sedot-wc-tarub": "/sedot-wc-tarub-tegal/",
  "sedot-wc-tembelang": "/sedot-wc-tembelang-jombang/",
  "sedot-wc-tenggarang": "/sedot-wc-tenggarang-bondowoso/",
  "sedot-wc-teras": "/sedot-wc-teras-boyolali/",
  "sedot-wc-tirtoyudo": "/sedot-wc-tirtoyudo-malang/",
  "sedot-wc-tlogosari": "/sedot-wc-tlogosari-bondowoso/",
  "sedot-wc-tulakan": "/sedot-wc-tulakan-pacitan/",
  "sedot-wc-wangon": "/sedot-wc-wangon-banyumas/",
  "sedot-wc-waru-pamekasan": "/sedot-wc-waru-pamekasan/"
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. Direct 301 Redirect from old blog URL to matching Landing Page
  const blogMatch = path.match(/^\/blog\/(sedot-wc-[a-z0-9-]+)\/?$/);
  if (blogMatch && blogToLanding[blogMatch[1]]) {
    return Response.redirect(`${url.origin}${blogToLanding[blogMatch[1]]}`, 301);
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
