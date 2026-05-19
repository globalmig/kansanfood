import Image from "next/image";
import Link from "next/link";

type Category = "공지" | "이벤트" | "제품";

const notices: {
  id: number;
  category: Category;
  title: string;
  date: string;
  isNew?: boolean;
}[] = [
  {
    id: 9,
    category: "이벤트",
    title: "2024 여름 시즌 한정 닭꼬치 세트 출시 기념 할인 행사",
    date: "2024-07-15",
    isNew: true,
  },
  {
    id: 8,
    category: "공지",
    title: "강산푸드 스마트스토어 리뉴얼 안내",
    date: "2024-07-01",
    isNew: true,
  },
  {
    id: 7,
    category: "제품",
    title: "신제품 '매콤 직화 닭꼬치' 정식 출시 안내",
    date: "2024-06-20",
    isNew: true,
  },
  {
    id: 6,
    category: "공지",
    title: "2024년 하반기 납품 단가 안내",
    date: "2024-06-01",
  },
  {
    id: 5,
    category: "공지",
    title: "추석 연휴 운영 일정 및 배송 마감일 안내",
    date: "2024-05-10",
  },
  {
    id: 4,
    category: "이벤트",
    title: "B2B 신규 파트너 모집 이벤트 — 첫 발주 10% 할인",
    date: "2024-04-22",
  },
  {
    id: 3,
    category: "제품",
    title: "HACCP 인증 갱신 완료 및 위생 관리 강화 안내",
    date: "2024-03-15",
  },
  {
    id: 2,
    category: "공지",
    title: "개인정보처리방침 개정 안내 (시행일: 2024.04.01)",
    date: "2024-03-01",
  },
  {
    id: 1,
    category: "공지",
    title: "강산푸드 공식 홈페이지 오픈 안내",
    date: "2024-01-02",
  },
];

const categoryStyle: Record<Category, string> = {
  공지: "bg-zinc-100 text-zinc-600",
  이벤트: "bg-red-50 text-red-500",
  제품: "bg-amber-50 text-amber-600",
};

export default function NoticePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full h-[60vh] min-h-[480px] overflow-hidden bg-zinc-200">
        <Image
          src="/images/main/hero_main.jpg"
          alt="공지사항"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        <div className="relative z-10 flex h-full items-end pb-20 px-20">
          <div>
            <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Notice
            </p>
            <h1 className="text-5xl font-bold text-white leading-tight drop-shadow-md">
              공지사항
            </h1>
          </div>
        </div>
      </section>

      {/* ── Notice List ── */}
      <section className="bg-white py-24 px-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-2">
                Announcements
              </p>
              <h2 className="text-3xl font-bold text-zinc-900">
                새로운 소식을 전합니다.
              </h2>
            </div>
            {/* Category Filter */}
            <div className="hidden md:flex items-center gap-2">
              {(["전체", "공지", "이벤트", "제품"] as const).map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === "전체"
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <ul className="divide-y divide-zinc-100">
            {notices.map((notice) => (
              <li key={notice.id}>
                <Link
                  href={`/notice/${notice.id}`}
                  className="group flex items-center gap-5 py-6 hover:bg-zinc-50 px-4 -mx-4 rounded-xl transition-colors duration-200"
                >
                  {/* Number */}
                  <span className="hidden sm:block w-10 text-center text-zinc-300 text-sm font-medium shrink-0">
                    {notice.id}
                  </span>

                  {/* Category */}
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                      categoryStyle[notice.category]
                    }`}
                  >
                    {notice.category}
                  </span>

                  {/* Title */}
                  <span className="flex-1 text-zinc-800 font-medium group-hover:text-zinc-900 truncate">
                    {notice.title}
                    {notice.isNew && (
                      <span className="ml-2 inline-block bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded align-middle">
                        NEW
                      </span>
                    )}
                  </span>

                  {/* Date */}
                  <span className="hidden sm:block shrink-0 text-zinc-400 text-sm">
                    {notice.date}
                  </span>

                  {/* Arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="shrink-0 text-zinc-300 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-200"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-16">
            <button className="w-9 h-9 rounded-md border border-zinc-200 text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                  p === 1
                    ? "bg-zinc-900 text-white"
                    : "border border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="w-9 h-9 rounded-md border border-zinc-200 text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
