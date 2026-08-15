import { COLOURWAY_KEY, SKIN_KEY, defaultColourway, defaultSkin } from "@/content/skins"

/**
 * Applies the stored skin to <html> before first paint.
 *
 * Runs as a blocking inline script for the same reason next-themes does: the
 * document is server-rendered with the default skin's markup, and if the
 * attribute arrived after hydration you would watch Blueprint's paper tokens
 * repaint over an Aurora frame. `?skin=` wins over storage and persists, which
 * is how a specific design gets shared for review.
 *
 * Temporary — see `content/skins.ts`.
 */
const boot = `
(function(){
  try {
    var skins = ['aurora','spatial','blueprint','current'];
    var cws = ['a2','original'];
    var p = new URLSearchParams(location.search);
    var s = p.get('skin');
    var c = p.get('cw');
    if (skins.indexOf(s) === -1) s = localStorage.getItem('${SKIN_KEY}');
    else localStorage.setItem('${SKIN_KEY}', s);
    if (cws.indexOf(c) === -1) c = localStorage.getItem('${COLOURWAY_KEY}');
    else localStorage.setItem('${COLOURWAY_KEY}', c);
    if (skins.indexOf(s) === -1) s = '${defaultSkin}';
    if (cws.indexOf(c) === -1) c = '${defaultColourway}';
    var e = document.documentElement;
    e.setAttribute('data-skin', s);
    e.setAttribute('data-cw', c);
  } catch (err) {
    document.documentElement.setAttribute('data-skin', '${defaultSkin}');
  }
})();
`

export function SkinBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: boot }} />
}
