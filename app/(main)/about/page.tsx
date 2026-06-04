import Image from "next/image";
import Link from "next/link";

const strengths = [
  {
    number: "01",
    title: "직접 공장 운영",
    desc: "아웃소싱 없이 자사 공장에서 전 공정을 직접 운영합니다. 원료 입고부터 가공·포장·출하까지 한 지붕 아래에서 관리하기 때문에 품질 편차가 없습니다.",
  },
  {
    number: "02",
    title: "HACCP 인증 위생 관리",
    desc: "식품안전관리인증기준 HACCP을 취득한 시설에서 엄격한 위생 기준을 준수하며 생산합니다. 모든 공정은 자체 품질관리팀이 실시간으로 점검합니다.",
  },
  {
    number: "03",
    title: "참숯 직화 전문 기술",
    desc: "가스가 아닌 참숯으로 직화 처리하는 독자 공정으로 깊은 풍미와 탄 향을 살립니다. 2017년부터 축적한 노하우가 맛의 기반입니다.",
  },
  {
    number: "04",
    title: "안정적 대량 공급",
    desc: "직접 생산 시설을 보유하고 있어 수요 급증에도 납기를 지킵니다. 편의점·급식·외식 프랜차이즈 등 다양한 채널에 전국 납품 중입니다.",
  },
];

const stats = [
  { value: "2017", label: "설립연도" },
  { value: "100%", label: "자체 생산" },
  { value: "32+", label: "전국 납품처" },
  { value: "HACCP", label: "품질 인증" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative w-full h-[60vh] min-h-[480px] overflow-hidden bg-zinc-200">
        <Image
          src="/images/main/hero_main.jpg"
          alt="강산푸드 소개"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="relative z-10 flex h-full items-end pb-20 px-20">
          <div>
            <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-4">
              About Us
            </p>
            <h1 className="text-5xl font-bold text-white leading-tight drop-shadow-md">
              직접 굽고, 직접 만들고,
              <br />
              직접 책임집니다.
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-5">
              Our Story
            </p>
            <h2 className="text-4xl font-bold text-zinc-900 leading-tight mb-8">
              외식·유통 파트너와
              <br />
              <span className="text-red-500">함께 굽습니다.</span>
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed mb-6">
              강산푸드는 2017년, 닭꼬치 하나에 집중하겠다는 신념으로 출발했습니다.
              호텔·다이닝·편의점·마트·프랜차이즈 등 전국 32개 파트너에게
              강산푸드 직화 닭꼬치를 선택받고 있습니다.
            </p>
            <p className="text-zinc-500 text-base leading-relaxed">
              모든 제품은 외주 없이 자사 공장에서 생산됩니다.
              원재료 선별부터 참숯 직화 공정, 위생 포장까지 강산푸드의 손을
              거쳐 고객의 식탁에 닿습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-zinc-200 rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-zinc-50 flex flex-col items-center justify-center py-14">
                <p className="text-4xl font-bold text-zinc-900 mb-2">{s.value}</p>
                <p className="text-zinc-400 text-sm tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-3">
              Our Strengths
            </p>
            <h2 className="text-4xl font-bold text-zinc-900 leading-tight">
              아웃소싱 없이,
              <br />
              처음부터 끝까지 강산푸드입니다.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((s) => (
              <div
                key={s.number}
                className="group border border-zinc-200 bg-white rounded-2xl p-10 hover:border-red-300 hover:shadow-md transition-all duration-300"
              >
                <p className="text-red-500 text-5xl font-bold mb-6 opacity-25 group-hover:opacity-100 transition-opacity duration-300">
                  {s.number}
                </p>
                <h3 className="text-zinc-900 text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full h-[480px] overflow-hidden bg-zinc-300">
        <Image
          src="/images/main/b2b_bg.jpg"
          alt="강산푸드 생산 현장"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-10">
          <div>
            <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Since 2017
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-md">
              직화의 맛,
              <br />
              파트너의 힘
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-10 text-center">
        <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-4">
          B2B Partnership
        </p>
        <h2 className="text-4xl font-bold text-zinc-900 mb-6">
          강산푸드와 함께하실 준비가 되셨나요?
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-10 py-4 rounded-md text-sm"
          >
            파트너십 문의하기 →
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors font-semibold px-10 py-4 rounded-md text-sm"
          >
            제품 둘러보기
          </Link>
        </div>
      </section>
    </>
  );
}
