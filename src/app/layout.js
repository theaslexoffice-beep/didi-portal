'use client';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>DIDI — अपनी समस्या हमारे साथ बाँटें</title>
        <meta name="description" content="DIDI - Citizen Grievance Redressal Platform. Share your problems with us. Bilaspur, Chhattisgarh." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
