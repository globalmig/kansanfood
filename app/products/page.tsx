import Image from "next/image";
import Link from "next/link";
import ProductsGrid from "@/components/ProductsGrid";

const qualities = [
  { icon: "🔥", label: "참숯 직화" },
  { icon: "🐔", label: "국내산 닭고기" },
  { icon: "✅", label: "HACCP 인증" },
  { icon: "🏭", label: "자체 공장 생산" },
];

export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden bg-zinc-200">
        <Image
          src="/images/main/hero_main.jpg"
          alt="강산푸드 제품"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="relative z-10 flex h-full items-end pb-16 px-20">
          <div>
            <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Products
            </p>
            <h1 className="text-5xl font-bold text-white leading-tight drop-shadow-md">
              직화로 완성한
              <br />
              강산푸드 제품
            </h1>
          </div>
        </div>
      </section>

      {/* ── 품질 배지 바 ── */}
      <div className="bg-zinc-900 py-5 px-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-10">
          {qualities.map((q) => (
            <div key={q.label} className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <span className="text-base">{q.icon}</span>
              {q.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── 제품 목록 ── */}
      <section className="bg-zinc-50 py-20 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-3">
              Our Products
            </p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-bold text-zinc-900">
                전체 제품 라인업
              </h2>
              <p className="text-zinc-400 text-sm hidden md:block">
                B2B 납품 문의는 우측 하단 버튼 또는 파트너십 페이지를 이용해 주세요.
              </p>
            </div>
          </div>

          <ProductsGrid />
        </div>
      </section>

      {/* ── 제조 공정 하이라이트 ── */}
      <section className="bg-white py-20 px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100">
            <Image
              src="/images/main/b2b_bg.jpg"
              alt="직화 공정"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div>
            <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-5">
              Manufacturing
            </p>
            <h2 className="text-4xl font-bold text-zinc-900 leading-tight mb-6">
              아웃소싱 없이,
              <br />
              자사 공장 직접 생산
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed mb-6">
              강산푸드의 모든 제품은 외주 없이 자체 HACCP 인증 공장에서
              생산됩니다. 원료 입고 → 세척·가공 → 양념 → 참숯 직화 →
              급속 냉각 → 위생 포장까지, 전 공정을 강산푸드가 직접 관리합니다.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "국내산 신선 닭고기만 사용",
                "참숯 직화로 깊은 풍미 구현",
                "HACCP 기준 위생 공정 준수",
                "자체 품질관리팀 상시 점검",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors font-semibold px-8 py-3 rounded-md text-sm"
            >
              회사 소개 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── B2B CTA ── */}
      <section className="bg-zinc-50 py-20 px-10 text-center">
        <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">
          B2B Partnership
        </p>
        <h2 className="text-4xl font-bold text-zinc-900 mb-5">
          대량 납품·OEM 문의 환영합니다
        </h2>
        <p className="text-zinc-400 text-base max-w-lg mx-auto mb-10">
          편의점, 급식, 외식 프랜차이즈, 마트 등 다양한 채널에 맞춤 공급이 가능합니다.
          납품 단가와 MOQ는 문의 후 안내드립니다.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-10 py-4 rounded-md text-sm"
        >
          파트너십 문의하기 →
        </Link>
      </section>
    </>
  );
}
