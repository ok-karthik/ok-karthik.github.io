/**
 * Tag → self-hosted logo.
 *
 * Extracted from `work-section.tsx` because the skin compositions each render
 * project tags and a second copy of this map would drift the moment one of
 * them gained a tag. The skills catalogue is the primary source; the aliases
 * below only cover tags that name a *thing* rather than a skill Karthik lists
 * ("Time Slicing" is a GPU Operator feature, not a line on the CV).
 */

import { skillGroups } from "@/content/skills"

const alias: Record<string, string> = {
  "gpu operator": "/icons/nvidia.svg",
  cuda: "/icons/nvidia.svg",
  "time slicing": "/icons/nvidia.svg",
  karpenter: "/icons/aws.svg",
  observability: "/icons/opentelemetry.svg",
  "lgtm stack": "/icons/grafana.svg",
  loki: "/loki.svg",
  tempo: "/tempo.svg",
  terragrunt: "/terragrunt.svg",
  aws: "/icons/aws.svg",
  "opa/conftest": "/icons/kubernetes.svg",
  "github actions": "/icons/githubactions.svg",
  idp: "/icons/kubernetes.svg",
  gitops: "/icons/argocd.svg",
  "argo cd": "/icons/argocd.svg",
  kubernetes: "/icons/kubernetes.svg",
  "kubernetes operator": "/icons/kubernetes.svg",
  python: "/icons/python.svg",
  kopf: "/icons/python.svg",
  helm: "/icons/helm.svg",
  "oci registry": "/icons/docker.svg",
  "library chart": "/icons/helm.svg",
  terraform: "/icons/terraform.svg",
  prometheus: "/icons/prometheus.svg",
  grafana: "/icons/grafana.svg",
  opentelemetry: "/icons/opentelemetry.svg",
}

export const iconFor = (tag: string): string | undefined => {
  const hit = skillGroups
    .flatMap((g) => g.skills)
    .find((s) => s.name.toLowerCase() === tag.toLowerCase())
  return hit?.icon ?? alias[tag.toLowerCase()]
}
