import Link from "next/link";
import { notFound } from "next/navigation";

type Category = "공지" | "이벤트" | "제품";

const notices: {
  id: number;
  category: Category;
  title: string;
  date: string;
  content: string;
}[] = [
  {
    id: 9,
    category: "이벤트",
    title: "2024 여름 시즌 한정 닭꼬치 세트 출시 기념 할인 행사",
    date: "2024-07-15",
    content: `안녕하세요, 강산푸드입니다.

여름 시즌을 맞아 신규 한정 세트 상품 출시를 기념한 특별 할인 행사를 진행합니다.

【 행사 기간 】
2024년 7월 15일(월) ~ 2024년 8월 31일(토)

【 대상 상품 】
- 강산푸드 여름 한정 닭꼬치 5종 세트
- 매콤 직화 닭꼬치 10입 세트

【 할인 내용 】
- 스마트스토어 구매 시 10% 할인
- 2세트 이상 구매 시 무료배송

이번 행사에 많은 관심과 이용 부탁드립니다.
감사합니다.`,
  },
  {
    id: 8,
    category: "공지",
    title: "강산푸드 스마트스토어 리뉴얼 안내",
    date: "2024-07-01",
    content: `안녕하세요, 강산푸드입니다.

네이버 스마트스토어가 새롭게 단장했습니다.

리뉴얼을 통해 상품 구성, 썸네일 이미지, 상세페이지가 모두 업데이트되었으며,
더욱 편리하게 이용하실 수 있도록 카테고리 구조도 개선되었습니다.

앞으로도 강산푸드를 많이 이용해 주시기 바랍니다.
감사합니다.`,
  },
  {
    id: 7,
    category: "제품",
    title: "신제품 '매콤 직화 닭꼬치' 정식 출시 안내",
    date: "2024-06-20",
    content: `안녕하세요, 강산푸드입니다.

오랜 준비 끝에 매콤 직화 닭꼬치를 정식 출시합니다.

참숯 직화 방식 그대로, 여기에 특제 양념을 더해 깊은 풍미와
알싸한 매운맛을 동시에 즐길 수 있습니다.

스마트스토어와 B2B 채널 모두에서 주문하실 수 있으며,
B2B 최소 발주 수량 및 단가 문의는 고객센터로 연락 주세요.

감사합니다.`,
  },
  {
    id: 6,
    category: "공지",
    title: "2024년 하반기 납품 단가 안내",
    date: "2024-06-01",
    content: `안녕하세요, 강산푸드입니다.

2024년 하반기 납품 단가를 아래와 같이 안내드립니다.

원재료 가격 안정화에 따라 기존 단가를 유지하기로 결정하였으며,
세부 단가표는 담당 영업팀을 통해 개별 안내 드릴 예정입니다.

문의사항은 아래 연락처로 문의해 주시기 바랍니다.
- 이메일: partner@kansanfood.co.kr
- 전화: 031-000-0000

감사합니다.`,
  },
  {
    id: 5,
    category: "공지",
    title: "추석 연휴 운영 일정 및 배송 마감일 안내",
    date: "2024-05-10",
    content: `안녕하세요, 강산푸드입니다.

추석 연휴 기간 운영 일정을 아래와 같이 안내드립니다.

【 휴무 기간 】
2024년 9월 14일(토) ~ 9월 18일(수) (5일간)

【 배송 마감일 】
연휴 전 마지막 출고: 2024년 9월 13일(금) 오후 2시

연휴 이후 정상 운영은 9월 19일(목)부터 재개됩니다.
미리 주문을 준비해 주시기 바랍니다.

감사합니다.`,
  },
  {
    id: 4,
    category: "이벤트",
    title: "B2B 신규 파트너 모집 이벤트 — 첫 발주 10% 할인",
    date: "2024-04-22",
    content: `안녕하세요, 강산푸드입니다.

신규 B2B 파트너를 모집합니다.

이번 이벤트 기간 내 첫 발주 시 10% 할인 혜택을 드립니다.

【 이벤트 기간 】
2024년 5월 1일 ~ 2024년 5월 31일

【 지원 대상 】
- 외식 프랜차이즈, 급식업체, 편의점, 마트 등
- 정기 발주가 가능한 사업체

파트너십 문의는 홈페이지 문의 페이지를 통해 신청해 주세요.
감사합니다.`,
  },
  {
    id: 3,
    category: "제품",
    title: "HACCP 인증 갱신 완료 및 위생 관리 강화 안내",
    date: "2024-03-15",
    content: `안녕하세요, 강산푸드입니다.

2024년 3월, HACCP 인증 갱신 심사를 통과하였습니다.

강산푸드는 식품안전관리인증기준(HACCP)을 준수하며
전 공정에서 엄격한 위생 기준을 유지하고 있습니다.

앞으로도 안전하고 믿을 수 있는 제품을 공급하기 위해
최선을 다하겠습니다.

감사합니다.`,
  },
  {
    id: 2,
    category: "공지",
    title: "개인정보처리방침 개정 안내 (시행일: 2024.04.01)",
    date: "2024-03-01",
    content: `안녕하세요, 강산푸드입니다.

개인정보 보호법 개정에 따라 개인정보처리방침을 아래와 같이 개정합니다.

【 주요 변경 내용 】
- 개인정보 보유 기간 명확화
- 제3자 제공 항목 구체화
- 고객 권리 행사 방법 추가

시행일: 2024년 4월 1일

기존 방침과 개정 방침의 상세 내용은 홈페이지 하단 개인정보처리방침 링크에서
확인하실 수 있습니다.

감사합니다.`,
  },
  {
    id: 1,
    category: "공지",
    title: "강산푸드 공식 홈페이지 오픈 안내",
    date: "2024-01-02",
    content: `안녕하세요, 강산푸드입니다.

강산푸드 공식 홈페이지가 새롭게 오픈했습니다.

홈페이지를 통해 제품 정보, B2B 파트너십 문의,
회사 소개 등 다양한 정보를 확인하실 수 있습니다.

앞으로도 강산푸드를 많은 사랑과 관심 부탁드립니다.
감사합니다.`,
  },
];

const categoryStyle: Record<Category, string> = {
  공지: "bg-zinc-100 text-zinc-600",
  이벤트: "bg-red-50 text-red-500",
  제품: "bg-amber-50 text-amber-600",
};

export function generateStaticParams() {
  return notices.map((n) => ({ id: String(n.id) }));
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = notices.find((n) => n.id === Number(id));
  if (!notice) notFound();

  const currentIndex = notices.findIndex((n) => n.id === notice.id);
  const prevNotice = notices[currentIndex + 1] ?? null;
  const nextNotice = notices[currentIndex - 1] ?? null;

  return (
    <>
      {/* ── Top spacer (GNB 높이 보정) ── */}
      <div className="h-24 bg-zinc-900" />

      {/* ── Detail ── */}
      <section className="bg-white py-16 px-10">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-10">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/notice" className="hover:text-zinc-900 transition-colors">
              공지사항
            </Link>
            <span>/</span>
            <span className="text-zinc-900">상세보기</span>
          </nav>

          {/* Title area */}
          <div className="border-t-2 border-zinc-900 pt-8 pb-6 border-b border-zinc-100">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                categoryStyle[notice.category]
              }`}
            >
              {notice.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight mb-4">
              {notice.title}
            </h1>
            <p className="text-zinc-400 text-sm">{notice.date}</p>
          </div>

          {/* Content */}
          <div className="py-12 min-h-[300px]">
            <div className="text-zinc-600 text-base leading-loose whitespace-pre-line">
              {notice.content}
            </div>
          </div>

          {/* Prev / Next */}
          <div className="border-t border-zinc-100 divide-y divide-zinc-100">
            {nextNotice && (
              <Link
                href={`/notice/${nextNotice.id}`}
                className="group flex items-center gap-4 py-5 hover:bg-zinc-50 px-4 -mx-4 transition-colors"
              >
                <span className="shrink-0 flex items-center gap-1 text-xs text-zinc-400 font-medium w-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                  다음글
                </span>
                <span className="text-zinc-700 text-sm group-hover:text-zinc-900 truncate">
                  {nextNotice.title}
                </span>
              </Link>
            )}
            {prevNotice && (
              <Link
                href={`/notice/${prevNotice.id}`}
                className="group flex items-center gap-4 py-5 hover:bg-zinc-50 px-4 -mx-4 transition-colors"
              >
                <span className="shrink-0 flex items-center gap-1 text-xs text-zinc-400 font-medium w-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  이전글
                </span>
                <span className="text-zinc-700 text-sm group-hover:text-zinc-900 truncate">
                  {prevNotice.title}
                </span>
              </Link>
            )}
          </div>

          {/* Back button */}
          <div className="mt-10 text-center">
            <Link
              href="/notice"
              className="inline-flex items-center gap-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors font-semibold px-8 py-3 rounded-md text-sm"
            >
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
