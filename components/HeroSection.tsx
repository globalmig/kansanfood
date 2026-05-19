import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-140 overflow-hidden bg-black">
      <Image
        src="/images/main/hero_main.jpg"
        alt="강산푸드 히어로 배경"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="px-6 sm:px-12 md:px-20 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-4 md:mb-6 drop-shadow-lg">
            믿을 수 있는 품질로 완성
            <br />
            닭꼬치 전문 기업, 강산푸드
          </h1>

          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-8 md:mb-10 max-w-md">
            강산푸드는 철저한 위생관리와 전문 제조 시스템을 기반으로
            고품질 닭꼬치를 생산하며, 안정적인 대량 생산과 맞춤 납품을
            제공하는 B2B 전문 파트너입니다.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md bg-red-500 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white hover:bg-red-600 transition-colors"
          >
            제품 보기
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
