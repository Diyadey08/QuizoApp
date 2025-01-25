import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../../app/globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coding Quiz for Kids",
  description: "A fun and interactive coding quiz for children",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js" />
    </html>
  )
}

