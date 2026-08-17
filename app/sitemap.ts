import type { MetadataRoute } from "next"
import { profile } from "@/content/profile"
import { projects } from "@/content/projects"
import { posts } from "@/content/writing"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.siteUrl}/writing`, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((project) => ({
      url: `${profile.siteUrl}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${profile.siteUrl}/writing/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
