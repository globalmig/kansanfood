export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Image from "next/image";

export const metadata: Metadata = {
  title: '제품',
  description: '강산푸드의 직화 시리즈 닭꼬치 제품을 소개합니다. 오리지널·고추장·간장마늘·와사비 등 다양한 맛의 프리미엄 닭꼬치를 만나보세요.',
  alternates: { canonical: 'https://kansanfood.com/products' },
};
import Link from "next/link";
import { FaFire, FaDrumstickBite, FaCheckCircle, FaIndustry } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import ProductsGrid from "@/components/ProductsGrid";
import { getProducts } from "@/lib/data";

const qualities = [
  { icon: <FaFire className="text-orange-400" />, label: "참숯 직화" },
  { icon: <FaDrumstickBite className="text-amber-400" />, label: "국내산 닭고기" },
  { icon: <FaCheckCircle className="text-green-400" />, label: "HACCP 인증" },
  { icon: <FaIndustry className="text-blue-400" />, label: "자체 공장 생산" },
];

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      {/* 히어로 */}
      <section className="relative w-full h-[50vh] min-h-90 md:min-h-100 overflow-hidden bg-zinc-200">
        <Image
          src="/images/main/hero_main.jpg"
          alt="강산푸드 제품"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-transparent" />
        <div className="relative z-10 flex h-full items-end pb-10 md:pb-16 px-6 md:px-20">
          <div>
            <p className="text-red-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
              Products
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
              직화로 완성한
              <br />
              강산푸드 제품
            </h1>
          </div>
        </div>
      </section>

      {/* 품질 배지 바 */}
      <div className="bg-zinc-900 py-4 md:py-5 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-5 md:gap-10">
          {qualities.map((q) => (
            <div key={q.label} className="flex items-center gap-2 text-white/80 text-xs md:text-sm font-medium">
              <span className="text-base">{q.icon}</span>
              {q.label}
            </div>
          ))}
        </div>
      </div>

      {/* 제품 그리드 */}
      <section className="bg-zinc-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="mb-10 md:mb-12">
            <p className="text-red-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">
              Our Products
            </p>
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <h2 className="text-2xl md:text-4xl font-bold text-zinc-900">전체 제품 라인업</h2>
              <p className="text-zinc-400 text-sm hidden md:block">
                B2B 납품 문의는 우측 하단 버튼 또는 파트너십 페이지를 이용해 주세요.
              </p>
            </div>
          </div>
          <ProductsGrid products={products} />
        </div>
      </section>

      {/* 제조 소개 */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100">
            <Image
              src="/images/main/b2b_bg.jpg"
              alt="직화 공정"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div>
            <p className="text-red-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 md:mb-5">
              Manufacturing
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 leading-tight mb-4 md:mb-6">
              아웃소싱 없이,
              <br />
              자사 공장 직접 생산
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-5 md:mb-6">
              강산푸드의 모든 제품은 외주 없이 자체 HACCP 인증 공장에서
              생산됩니다. 원료 입고 → 세척·가공 → 양념 → 참숯 직화 →
              급속 냉각 → 위생 포장까지, 전 공정을 강산푸드가 직접 관리합니다.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors font-semibold px-6 md:px-8 py-3 rounded-md text-sm"
            >
              회사 소개 보기 <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="bg-zinc-50 py-12 md:py-20 px-5 md:px-10 text-center">
        <p className="text-red-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
          B2B Partnership
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 md:mb-5">
          대량 납품·OEM 문의 환영합니다
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-8 md:px-10 py-3 md:py-4 rounded-md text-sm"
        >
          파트너십 문의하기 <FiArrowRight />
        </Link>
      </section>
    </>
  );
}
