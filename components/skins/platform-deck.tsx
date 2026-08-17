"use client"

/**
 * The platform deck — three planes, one per tier, with the tools that run at
 * that tier printed on them.
 *
 * It started as three empty slabs. Karthik's note was the right one: an empty
 * stack is a shape, not a statement. Naming the tools turns the object into
 * evidence — a reader who knows the domain can see in one glance that this is
 * a telemetry tier over a control plane over a cloud, which is exactly the
 * claim the section beside it is making in words.
 *
 * Every tool here is named in `experience.ts` or `projects.ts` and every logo
 * is already self-hosted for the Tech Skills section. Nothing new is claimed
 * by the picture that isn't claimed in text somewhere a reader can check.
 *
 * Lives on its own rather than inside the Aurora section that renders it: it
 * was shared with a second skin, and whatever design wins is likely to want
 * the deck somewhere other than where Aurora puts it.
 */
export type DeckLayer = {
  id: string
  name: string
  /** Long form, for Aurora's list. */
  detail: string
  /** Short form, for a tighter legend. */
  short: string
  tools: { name: string; icon: string }[]
}

export const platformLayers: DeckLayer[] = [
  {
    id: "workloads",
    name: "Workloads & telemetry",
    detail: "OpenTelemetry pipelines, LGTM backends, SLOs and alerting as code",
    short: "OTel · LGTM · SLOs",
    tools: [
      { name: "OpenTelemetry", icon: "/icons/opentelemetry.svg" },
      { name: "Prometheus", icon: "/icons/prometheus.svg" },
      { name: "Grafana", icon: "/icons/grafana.svg" },
      { name: "Loki", icon: "/loki.svg" },
    ],
  },
  {
    id: "control-plane",
    name: "Control plane",
    detail: "Kubernetes, Argo CD, Helm library charts, admission policy",
    short: "Kubernetes · Argo CD · Helm",
    tools: [
      { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
      { name: "Argo CD", icon: "/icons/argocd.svg" },
      { name: "Helm", icon: "/icons/helm.svg" },
      { name: "Kyverno", icon: "/icons/kyverno.svg" },
    ],
  },
  {
    id: "foundation",
    name: "Cloud foundation",
    detail: "Terraform and Terragrunt across AWS, Azure and GCP",
    short: "Terraform · AWS · Azure · GCP",
    tools: [
      { name: "Terraform", icon: "/icons/terraform.svg" },
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Azure", icon: "/icons/azure.svg" },
      { name: "GCP", icon: "/icons/gcp.svg" },
    ],
  },
]

/**
 * Inert by design: `aria-hidden`, and every layer it draws is also rendered as
 * a real list by the caller. A sheared logo grid inside a CSS 3D transform is
 * not something a screen reader can make sense of, and it does not have to —
 * the list is the accessible copy, not a fallback.
 */
export function PlatformDeck({
  lit,
  className = "",
}: {
  /** Id of the layer to light, or null. */
  lit: string | null
  className?: string
}) {
  return (
    <div aria-hidden className={`deck-scene relative ${className}`}>
      <div className="deck">
        {platformLayers.map((layer, i) => (
          <div
            key={layer.id}
            className="deck-layer"
            data-lit={lit === layer.id ? "true" : "false"}
            // 96px, not 70: at the tighter spacing the planes' logo grids
            // overlapped in projection and the three tiers read as one.
            style={{ transform: `translateZ(${(platformLayers.length - 1 - i) * 96}px)` }}
          >
            <div className="deck-face">
              {layer.tools.map((tool) => (
                <span key={tool.name} className="deck-chip">
                  <img
                    src={tool.icon}
                    alt=""
                    width={22}
                    height={22}
                    loading="eager"
                    decoding="sync"
                  />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
