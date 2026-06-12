export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: '강산푸드 | 닭꼬치 전문 기업',
  description: '믿을 수 있는 품질로 완성, 닭꼬치 전문 기업 강산푸드. 국내산 닭고기를 참숯 직화 방식으로 구워낸 프리미엄 닭꼬치를 B2B 납품합니다.',
  alternates: { canonical: 'https://kansanfood.com' },
};
import BestSection from "@/components/BestSection";
import B2BSection from "@/components/B2BSection";
import ProductGridSection from "@/components/ProductGridSection";
import { getHomepageSection } from "@/lib/data";

export default async function Home() {
  const bestProducts = getHomepageSection('best');
  const gridProducts = getHomepageSection('premium_grid');

  const [best, grid] = await Promise.all([bestProducts, gridProducts]);

  return (
    <>
      <HeroSection />
      <BestSection products={best} />
      <B2BSection />
      <ProductGridSection products={grid} />
    </>
  );
}
