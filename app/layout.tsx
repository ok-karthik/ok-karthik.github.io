import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { NeuralMesh } from '@/components/neural-mesh'
import { profile } from '@/content/profile'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

const pageTitle = `${profile.name} | ${profile.title}`

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: pageTitle,
  description: profile.metaDescription,
  alternates: {
    // Two hosts serve this site; canonicalise on one so they don't compete.
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: profile.siteUrl,
    title: pageTitle,
    description: profile.metaDescription,
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: profile.metaDescription,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

/** Schema.org Person — how search engines resolve "Karthik Orugonda" to this page. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: profile.metaDescription,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location.city,
    addressCountry: profile.location.country,
  },
  sameAs: [profile.social.github, profile.social.linkedin],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#f1f5f9] dark:bg-gradient-to-br dark:from-[#090714] dark:via-[#1a0f3d] dark:to-[#0c071a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NeuralMesh />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
