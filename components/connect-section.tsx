const contactLinks = [
  {
    label: "Email",
    href: "mailto:ok.karthik99@gmail.com",
    value: "ok.karthik99@gmail.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/karthikorugonda",
    value: "linkedin.com/in/karthikorugonda",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/ok-karthik",
    value: "github.com/ok-karthik",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
]

export function ConnectSection() {
  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-colors">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">{"Let's build something together"}</h2>
            <p className="text-muted-foreground text-sm font-medium">Open to Senior Platform Eng, Staff SRE, AI Infra roles • Berlin or remote</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 mt-4 md:mt-0">
            <a 
              href="mailto:ok.karthik99@gmail.com"
              className="px-4 py-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground font-mono text-sm font-medium rounded-lg transition-all flex items-center gap-2"
            >
              ok.karthik99@gmail.com
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            
            {contactLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-secondary/30 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-lg border border-border/50 hover:border-primary/30 transition-all flex items-center gap-2"
                aria-label={link.label}
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  {link.icon}
                </span>
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 text-sm text-muted-foreground font-mono flex flex-col items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Berlin, Germany</span>
            </div>
            <span className="hidden sm:inline text-border">|</span>
            <span>Visa: German Permanent Residence</span>
          </div>
          <p className="opacity-70">
            © {new Date().getFullYear()} Karthik Orugonda. Built with React & Next.js.
          </p>
        </div>
      </div>
    </section>
  )
}
