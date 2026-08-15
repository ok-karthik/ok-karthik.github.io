import { SKIN_KEY, defaultSkin } from "@/content/skins"

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
    var skins = ['aurora','blueprint','current'];
    var p = new URLSearchParams(location.search);
    var s = p.get('skin');
    if (skins.indexOf(s) === -1) s = localStorage.getItem('${SKIN_KEY}');
    else localStorage.setItem('${SKIN_KEY}', s);
    if (skins.indexOf(s) === -1) s = '${defaultSkin}';
    document.documentElement.setAttribute('data-skin', s);
  } catch (err) {
    document.documentElement.setAttribute('data-skin', '${defaultSkin}');
  }
})();
`

export function SkinBootScript() {
  return <script dangerouslySetInnerHTML={{ __html: boot }} />
}
