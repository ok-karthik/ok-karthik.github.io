/**
 * Cloudflare Web Analytics.
 *
 * Replaces Vercel Analytics, which POSTs to /_vercel/insights — an endpoint
 * that exists only on Vercel. This site deploys to GitHub Pages and Cloudflare
 * Pages, so it was silently collecting nothing.
 *
 * Cloudflare's beacon is free, cookieless and stores no personal data, so it
 * needs no consent banner under GDPR — which matters for a site aimed at a
 * German audience.
 *
 * SETUP (one step, ~2 minutes):
 *   1. Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site
 *   2. Enter ok-karthik.github.io (and karthik-orugonda.pages.dev as a second
 *      site if you want them separated)
 *   3. Copy the token out of the snippet it shows you and paste it below
 *
 * The token is not a secret — it ships in the client HTML by design, so there
 * is nothing to protect and no build-time env var needed.
 */

const CF_BEACON_TOKEN = "" // ← paste the token here to switch analytics on

export function Analytics() {
  if (!CF_BEACON_TOKEN) return null

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
    />
  )
}
