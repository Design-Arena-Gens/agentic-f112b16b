import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hand Control Interface',
  description: '3D hand interacting with floating smartphone controls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
