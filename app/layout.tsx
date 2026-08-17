import type { Metadata } from 'next'
import {
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Geist,
  Geist_Mono,
} from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
// Background. A flow-field alternative (particles on a noise field leaving
// trails) was built and rejected: the trails accumulate into a scratchy,
// matted texture over a large dark area. Don't rebuild it.
import { NeuralMesh } from '@/components/neural-mesh'
import { Spotlight } from '@/components/spotlight'
import { Analytics } from '@/components/analytics'
import { profile } from '@/content/profile'
import './globals.css'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const fontVars = [
  plexSans.variable,
  plexMono.variable,
  geist.variable,
  geistMono.variable,
].join(' ')

const pageTitle = `${profile.name} | ${profile.title}`

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: pageTitle,
  description: profile.metaDescription,
  alternates: {
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
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
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
          <Spotlight />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
