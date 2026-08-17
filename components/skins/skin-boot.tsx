import { SKIN_KEY, defaultSkin } from "@/content/skins"

/**
 * Applies the stored skin to <html> before first paint.
 *
 * Runs as a blocking inline script. `?skin=` in the URL wins over storage
 * and persists to localStorage, allowing easy link sharing / comparison.
 */
const boot = `
(function(){
  try {
    var skins = ['current','aurora'];
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
