"""How often does each portfolio project's subject matter appear in the job
descriptions Karthik is actually targeting?

Signal = % of jobs in a category whose description mentions the project's theme.
Used to decide which projects lead on the portfolio, not to make any claim.
"""

import glob
import json
import re
import collections

ROOT = "/Users/karthik.orugonda/github/linkedin_jobs_scraper"

# Categories Karthik applies to today.
NOW = {
    "Platform Engineering",
    "Site Reliability Engineering (SRE)",
    "DevOps Engineering",
}
STAFF = {"Staff / Principal Engineering"}
CLOUD = {"Cloud Engineering"}
NEXT = {"AI Infrastructure", "MLOps"}

SIGS = {
    "ai-infrastructure-on-eks": r"\b(gpu|cuda|nvidia|karpenter|dcgm|accelerator|a100|h100)\b",
    "otel-observability-platform": r"\b(opentelemetry|otel|prometheus|grafana|loki|tempo|observability|distributed tracing|slo|sli)\b",
    "enterprise-aws-terragrunt": r"\b(terraform|terragrunt|opa|conftest|policy.as.code|infracost|pulumi)\b",
    "internal-developer-platform": r"\b(internal developer platform|idp|gitops|argo ?cd|argocd|flux ?cd|crossplane|backstage|self.service|developer experience|golden path|platform as a product)\b",
    "finops-k8s-operator": r"\b(kubernetes operator|custom resource|crd|controller.runtime|kopf|finops|cost optimi[sz]|cloud cost)\b",
    "helm-library-chart": r"\b(helm)\b",
}

rows = {}
for f in glob.glob(f"{ROOT}/jobs_output/*_filtered_semantic.json"):
    for r in json.load(open(f)):
        rows[r["id"]] = r

pats = {k: re.compile(v, re.I) for k, v in SIGS.items()}


def share(jobs, slug):
    if not jobs:
        return 0.0, 0
    n = sum(1 for j in jobs if pats[slug].search(j.get("descriptionText") or ""))
    return 100 * n / len(jobs), n


def bucket(cats, minfit=None):
    out = []
    for r in rows.values():
        if r.get("SemanticCategory") not in cats:
            continue
        if minfit is not None:
            fs = r.get("FitScore")
            if not isinstance(fs, (int, float)) or fs < minfit:
                continue
        out.append(r)
    return out


buckets = [
    ("NOW: Platform+SRE+DevOps", bucket(NOW)),
    ("  └ FitScore >= 60", bucket(NOW, 60)),
    ("Staff / Principal", bucket(STAFF)),
    ("Cloud Engineering", bucket(CLOUD)),
    ("NEXT: AI Infra + MLOps", bucket(NEXT)),
]

print(f"{'project':32}", "  ".join(f"{name[:22]:>24}" for name, _ in buckets))
for name, _ in [(0, 0)]:
    pass
print(f"{'':32}", "  ".join(f"{'n=' + str(len(j)):>24}" for _, j in buckets))
print("-" * 165)

scores = collections.defaultdict(dict)
for slug in SIGS:
    cells = []
    for name, jobs in buckets:
        pct, n = share(jobs, slug)
        scores[slug][name] = pct
        cells.append(f"{pct:>18.1f}% ({n:>3})".rjust(24))
    print(f"{slug:32}", "  ".join(cells))

print()
print("Ranked by the NOW bucket (Platform + SRE + DevOps), his stated target:")
for i, (slug, d) in enumerate(
    sorted(scores.items(), key=lambda kv: -kv[1]["NOW: Platform+SRE+DevOps"]), 1
):
    print(f"  {i}. {slug:32} {d['NOW: Platform+SRE+DevOps']:5.1f}%")
