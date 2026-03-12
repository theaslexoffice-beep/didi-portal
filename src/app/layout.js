import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'DIDI Portal - Digital Democracy for Bilaspur',
  description: 'Report civic issues, find government schemes, access legal aid, and engage with your community in Bilaspur, Chhattisgarh.',
  keywords: 'Bilaspur, civic tech, government schemes, legal aid, RTI, community issues, smart city',
  authors: [{ name: 'DIDI Portal Team' }],
  openGraph: {
    title: 'DIDI Portal - Digital Democracy for Bilaspur',
    description: 'Empowering citizens through technology',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#E63946',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-[#F8F9FA] text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
