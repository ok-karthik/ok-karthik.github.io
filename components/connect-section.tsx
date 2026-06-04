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
    <section className="py-20 px-6 bg-secondary/20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl group-hover:bg-primary/50 transition-colors duration-500"></div>
            <img 
              src="https://github.com/ok-karthik.png" 
              alt="Karthik Orugonda" 
              className="relative w-28 h-28 rounded-full border-2 border-primary/50 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {"Let's Connect"}
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          {"Interested in discussing cloud infrastructure, platform engineering, or potential collaborations? Reach out through any of these channels."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group bg-card backdrop-blur-sm border border-border rounded-lg p-6 
                         flex flex-col items-center gap-3 min-w-[200px]
                         transition-all duration-300 ease-out
                         hover:border-primary hover:shadow-[0_0_20px_rgba(34,211,238,0.3),0_0_40px_rgba(34,211,238,0.15)]
                         hover:-translate-y-1"
            >
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                {link.icon}
              </span>
              <span className="font-semibold text-foreground">{link.label}</span>
              <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {link.value}
              </span>
            </a>
          ))}
        </div>

        <p className="mt-16 text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Karthik Orugonda. Built with React & Next.js.
        </p>
      </div>
    </section>
  )
}
