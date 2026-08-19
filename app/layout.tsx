import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ParticleSphere } from '@/components/particle-sphere'
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
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const fontVars = `${plexSans.variable} ${plexMono.variable}`

export const metadata: Metadata = {
  title: `${profile.name} | Senior Platform Engineer & SRE`,
  description: profile.metaDescription,
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#f1f5f9] dark:bg-gradient-to-br dark:from-[#090714] dark:via-[#1a0f3d] dark:to-[#0c071a] text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ParticleSphere />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
