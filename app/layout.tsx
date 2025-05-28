import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider'
import ConfettiButton from '@/components/confetti-button'

export const metadata: Metadata = {
  title: 'Lovely Weather - Beautiful Weather Updates',
  description: 'Get beautiful, real-time weather updates with a modern, interactive interface',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full flex flex-col antialiased">
        <ThemeProvider defaultTheme="light" attribute="class">
          <ConfettiButton />
          {/* Hello text in top right corner */}
          <div className="fixed top-4 right-16 z-50">
            <span className="text-white text-lg font-medium drop-shadow-lg">
              hello
            </span>
          </div>
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}




