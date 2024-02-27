import Head from 'next/head'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JUPITER',
  description: 'Supported by Nomura',
  icons: {
    icon: [
      {
        url: './favicons/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      }, 
      {
        url: './favicons/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      }
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: './favicons/apple-touch-icon.png'
      },
      {
        rel: 'manifest',
        url: './favicons/site.webmanifest'
      },
      {
        rel: 'mask-icon',
        url: './favicons/safari-pinned-tab.svg',
        color: '#000000'
      },
      {
        rel: 'shortcut icon',
        url: './favicons/favicons/favicon.ico'
      },
    ]
  },
  other: {
    "msapplication-TileColor": '#000000',
    "msapplication-config": './favicons/browserconfig.xml',
    "theme-color": '#000000',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="select-none overflow-y-scroll hidden-scrollbar bg-repeat bg-cover" style={{}}>
      <body className="">{children}</body>
    </html>
  )
}
