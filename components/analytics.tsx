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
 * Registered for hostname ok-karthik.github.io — the URL Karthik actually
 * shares, since LinkedIn flags *.pages.dev links as possible malicious content.
 *
 * The token is not a secret. It ships in the client HTML by design, so there is
 * nothing to protect and no build-time env var to plumb through CI.
 *
 * NOTE: this is Analytics & Logs → Web Analytics, which needs only a script
 * tag. It is NOT "Connect your domain", which is DNS onboarding and cannot
 * work here — GitHub owns github.io, so its nameservers aren't ours to move.
 */

const CF_BEACON_TOKEN = "c1d3e3c1ca524f5b9cf8afeced260372"

export function Analytics() {
  if (!CF_BEACON_TOKEN) return null

  return (
    <script
      type="module"
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
    />
  )
}
