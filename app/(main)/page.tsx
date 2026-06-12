export const dynamic = 'force-dynamic';

import HeroSection from "@/components/HeroSection";
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
