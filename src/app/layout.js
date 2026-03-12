import './globals.css';

export const metadata = {
  title: 'DIDI — अपनी समस्या हमारे साथ बाँटें',
  description: 'DIDI - Digital Initiative for Democratic Inclusion. Citizen Grievance Redressal Platform for Bilaspur, Chhattisgarh.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
