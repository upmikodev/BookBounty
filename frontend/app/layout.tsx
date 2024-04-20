import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { CustomProvider } from '@/contexts/IsLoggedIn'
import Navbar from '@/components/Navbar'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BookBounty',
  description: 'Buy and sell books online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CustomProvider>
          <Navbar />
          <div>{children}</div>
        </CustomProvider>
      </body>
    </html>
  )
}
