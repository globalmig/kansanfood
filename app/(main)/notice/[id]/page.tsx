import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoticeById, getAdjacentNotices } from "@/lib/data";
import type { Notice } from "@/lib/types";

type Category = Notice["category"];

const categoryStyle: Record<Category, string> = {
  공지: "bg-zinc-100 text-zinc-600",
  이벤트: "bg-red-50 text-red-500",
  제품: "bg-amber-50 text-amber-600",
};

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNoticeById(Number(id));
  if (!notice) notFound();

  const { prev, next } = await getAdjacentNotices(notice.id);

  return (
    <>
      <div className="h-24 bg-zinc-900" />

      <section className="bg-white py-16 px-10">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-10">
            <Link href="/" className="hover:text-zinc-900 transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/notice" className="hover:text-zinc-900 transition-colors">공지사항</Link>
            <span>/</span>
            <span className="text-zinc-900">상세보기</span>
          </nav>

          <div className="border-t-2 border-zinc-900 pt-8 pb-6 border-b border-zinc-100">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                categoryStyle[notice.category] ?? "bg-zinc-100 text-zinc-600"
              }`}
            >
              {notice.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight mb-4">
              {notice.title}
            </h1>
            <p className="text-zinc-400 text-sm">{notice.created_at.slice(0, 10)}</p>
          </div>

          <div className="py-12 min-h-[300px]">
            <div className="text-zinc-600 text-base leading-loose whitespace-pre-line">
              {notice.content}
            </div>
          </div>

          <div className="border-t border-zinc-100 divide-y divide-zinc-100">
            {next && (
              <Link
                href={`/notice/${next.id}`}
                className="group flex items-center gap-4 py-5 hover:bg-zinc-50 px-4 -mx-4 transition-colors"
              >
                <span className="shrink-0 flex items-center gap-1 text-xs text-zinc-400 font-medium w-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                  다음글
                </span>
                <span className="text-zinc-700 text-sm group-hover:text-zinc-900 truncate">
                  {next.title}
                </span>
              </Link>
            )}
            {prev && (
              <Link
                href={`/notice/${prev.id}`}
                className="group flex items-center gap-4 py-5 hover:bg-zinc-50 px-4 -mx-4 transition-colors"
              >
                <span className="shrink-0 flex items-center gap-1 text-xs text-zinc-400 font-medium w-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  이전글
                </span>
                <span className="text-zinc-700 text-sm group-hover:text-zinc-900 truncate">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>

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
