import { Lato, Pinyon_Script } from 'next/font/google';
import './globals.css';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
  display: 'swap',
});

const pinyonScript = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pinyon',
  display: 'swap',
});

export const metadata = {
  title: 'Abishek Mosesraj - Tech Lead & AWS Cloud Architect',
  description: 'Abishek Mosesraj - Sr. Software Engineer with 7+ years of experience in scalable systems, Python development, and team leadership',
  keywords: 'Tech Lead, AWS Cloud Architect, Python Developer, Software Engineer, Chennai, India, Scalable Systems, DevOps',
  authors: [{ name: 'Abishek Mosesraj' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Abishek Mosesraj - Tech Lead & AWS Cloud Architect',
    description: '7+ years of experience designing scalable systems, optimizing data workflows, and leading cross-functional teams',
    url: 'https://abishekmosesraj.com',
    siteName: 'Abishek Mosesraj Portfolio',
    images: [
      {
        url: 'https://abishekmosesraj.com/apple-touch-icon.png',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Abishek Mosesraj - Tech Lead & AWS Cloud Architect',
    description: '7+ years of experience in scalable systems and cloud architecture',
    images: ['https://abishekmosesraj.com/apple-touch-icon.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  other: {
    'theme-color': '#00d4ff',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${pinyonScript.variable}`}>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abishek Mosesraj',
              jobTitle: 'Tech Lead',
              description: 'AWS Cloud Architect with 7+ years of experience',
              url: 'https://abishekmosesraj.com',
              sameAs: ['https://linkedin.com/in/abishekmosesraj'],
              worksFor: {
                '@type': 'Organization',
                name: 'THOUGHTWORKS',
              },
              knowsAbout: [
                'AWS Cloud Architecture',
                'Python Development',
                'Software Engineering',
                'Team Leadership',
                'DevOps',
                'Scalable Systems',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Chennai',
                addressCountry: 'India',
              },
            }),
          }}
        />
      </head>
      <body>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
