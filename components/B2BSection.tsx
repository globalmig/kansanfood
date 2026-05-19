import Image from "next/image";
import Link from "next/link";

export default function B2BSection() {
  return (
    <section className="relative w-full min-h-[560px] overflow-hidden bg-black">
      <Image
        src="/images/main/b2b_bg.jpg"
        alt="강산푸드 B2B 파트너십"
        fill
        className="object-cover object-center"
      />
      {/* 왼쪽 어두운 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      <div className="relative z-10 flex h-full min-h-[560px] items-center">
        <div className="px-20 max-w-xl">
          <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">B2B Partnership</p>
          <h2 className="text-4xl font-bold text-white leading-tight mb-6">
            믿을 수 있는 공급사,
            <br />
            강산푸드와 함께하세요
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed mb-10">
            편의점, 급식, 외식업체 등 다양한 B2B 파트너사에
            <br />
            안정적인 대량 공급과 맞춤 납품 서비스를 제공합니다.
            <br />
            HACCP 인증 생산 시설에서 위생적으로 제조됩니다.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            {["HACCP 인증", "대량 공급 가능", "맞춤 OEM", "전국 납품"].map((badge) => (
              <span
                key={badge}
                className="border border-white/30 text-white/80 text-xs px-4 py-2 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-8 py-4 rounded-md text-sm"
          >
            파트너십 문의하기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
