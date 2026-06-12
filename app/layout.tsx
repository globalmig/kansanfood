import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

const BASE_URL = 'https://kansanfood.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '강산푸드 | 닭꼬치 전문 기업',
    template: '%s | 강산푸드',
  },
  description: '믿을 수 있는 품질로 완성, 닭꼬치 전문 기업 강산푸드. 국내산 닭고기를 참숯 직화 방식으로 구워낸 프리미엄 닭꼬치를 B2B 납품합니다.',
  keywords: ['강산푸드', '닭꼬치', '직화 닭꼬치', 'B2B 납품', '편의점 닭꼬치', 'HACCP', '국내산 닭꼬치'],
  authors: [{ name: '강산푸드', url: BASE_URL }],
  creator: '강산푸드',
  publisher: '강산푸드',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: '강산푸드',
    title: '강산푸드 | 닭꼬치 전문 기업',
    description: '믿을 수 있는 품질로 완성, 닭꼬치 전문 기업 강산푸드.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '강산푸드 대표 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '강산푸드 | 닭꼬치 전문 기업',
    description: '믿을 수 있는 품질로 완성, 닭꼬치 전문 기업 강산푸드.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '강산푸드',
    url: BASE_URL,
    logo: `${BASE_URL}/images/common/logo_white.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contact@kansanfood.com',
      availableLanguage: 'Korean',
    },
    sameAs: [BASE_URL],
  };

  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
