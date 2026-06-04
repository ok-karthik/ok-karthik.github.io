import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { NeuralMesh } from '@/components/neural-mesh'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Karthik Orugonda | Senior Platform Engineer & SRE',
  description: 'Senior Platform Engineer with 10+ years building cloud-native platforms and internal developer tooling across AWS, Azure and GCP. Specialized in Kubernetes-based IDPs, Terraform-driven self-service infrastructure, and GitOps-driven CI/CD.',
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#f1f5f9] dark:bg-gradient-to-br dark:from-[#090714] dark:via-[#1a0f3d] dark:to-[#0c071a]">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NeuralMesh />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
