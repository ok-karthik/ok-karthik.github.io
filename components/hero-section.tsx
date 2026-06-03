export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden">
      {/* Subtle dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Soft radial gradient glow */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 40%, var(--primary), transparent)`,
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-50">
          Karthik Orugonda
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium text-primary">
          Senior Platform Engineer and SRE
        </h2>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-7 md:leading-8 text-pretty pt-4">
          Senior Platform Engineer with 10+ years building cloud-native platforms and internal 
          developer tooling across AWS, Azure and GCP. Specialized in Kubernetes-based IDPs, 
          Terraform-driven self-service infrastructure, and GitOps-driven CI/CD.
        </p>
        
        <div className="pt-6">
          <a
            href="#expertise"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className="font-mono text-sm">Explore my work</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
