import { certifications, education, languages } from "@/content/profile"

/**
 * Certifications, education and languages, compressed into one strip.
 *
 * These are qualifying facts, not selling points — a recruiter checks them and
 * moves on — so they get one compact section rather than the half-page of
 * glowing cards they had before.
 */
export function CredentialsSection() {
  return (
    <section id="credentials" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="label mb-10">Credentials</p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="label mb-4 border-b border-border pb-2">Certifications</h3>
            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-center gap-3">
                  <img
                    src={cert.badge}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-auto shrink-0 object-contain"
                  />
                  <div>
                    <p className="font-mono text-body font-semibold text-foreground">
                      {cert.name}
                    </p>
                    <p className="text-small text-muted-foreground">{cert.fullName}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label mb-4 border-b border-border pb-2">Education</h3>
            <p className="text-body text-foreground">{education.degree}</p>
            <p className="mt-1.5 text-small text-muted-foreground">{education.institution}</p>
            <p className="mt-1.5 font-mono text-micro text-muted-foreground">
              Graduated {education.graduated} · CGPA {education.grade}
            </p>
          </div>

          <div>
            <h3 className="label mb-4 border-b border-border pb-2">Languages</h3>
            <ul className="space-y-3">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-baseline justify-between gap-4">
                  <span className="text-body text-foreground">{lang.name}</span>
                  <span className="font-mono text-micro text-muted-foreground">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
