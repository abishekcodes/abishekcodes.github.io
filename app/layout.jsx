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
  title: 'Abishek Moses Raj - Tech Lead & AWS Cloud Architect | Chennai',
  description: 'Tech Lead with 9 years building scalable Python applications and AWS cloud architectures. Expert in FastAPI, LangGraph, AI agents at Thoughtworks. Previously led engineering teams at Roanuz.',
  keywords: 'Abishek Moses Raj, Tech Lead Chennai, AWS Cloud Architect, Python Developer, LangGraph, AI Agents, FastAPI, DevOps Engineer Chennai, Thoughtworks, Roanuz, CricketAPI',
  authors: [{ name: 'Abishek Moses Raj' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Abishek Moses Raj - Tech Lead & AWS Cloud Architect',
    description: 'Tech Lead with 9 years building scalable Python applications and AWS cloud architectures. Expert in FastAPI, LangGraph, and AI agents.',
    url: 'https://abishekmosesraj.com',
    siteName: 'Abishek Moses Raj Portfolio',
    images: [
      {
        url: 'https://abishekmosesraj.com/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: 'Abishek Moses Raj',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Abishek Moses Raj - Tech Lead & AWS Cloud Architect',
    description: 'Tech Lead with 9 years building scalable Python applications and AWS cloud architectures.',
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
              name: 'Abishek Moses Raj',
              jobTitle: 'Senior Consultant',
              description: 'Tech Lead with 9 years building scalable Python applications and AWS cloud architectures. Expert in FastAPI, LangGraph, and AI agents.',
              url: 'https://abishekmosesraj.com',
              sameAs: [
                'https://linkedin.com/in/abishekmosesraj',
                'https://github.com/abishekcodes'
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Thoughtworks',
                url: 'https://thoughtworks.com'
              },
              alumniOf: [
                {
                  '@type': 'Organization',
                  name: 'Amazon'
                },
                {
                  '@type': 'Organization',
                  name: 'Roanuz'
                }
              ],
              knowsAbout: [
                'AWS Cloud Architecture',
                'Python Development',
                'FastAPI',
                'LangGraph',
                'AI Agents',
                'DevOps',
                'Team Leadership',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Abishek Moses Raj Portfolio',
              url: 'https://abishekmosesraj.com',
              description: 'Personal portfolio of Abishek Moses Raj - Tech Lead & AWS Cloud Architect',
              author: {
                '@type': 'Person',
                name: 'Abishek Moses Raj'
              }
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
