import Image from "next/image";
import Link from "next/link";
import { getNotices } from "@/lib/data";
import type { Notice } from "@/lib/types";

type Category = Notice["category"];

const categoryStyle: Record<Category, string> = {
  공지: "bg-zinc-100 text-zinc-600",
  이벤트: "bg-red-50 text-red-500",
  제품: "bg-amber-50 text-amber-600",
};

export default async function NoticePage() {
  const notices = await getNotices();

  return (
    <>
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

      <section className="bg-white py-24 px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-2">
                Announcements
              </p>
              <h2 className="text-3xl font-bold text-zinc-900">새로운 소식을 전합니다.</h2>
            </div>
          </div>

          {notices.length === 0 ? (
            <p className="text-center text-zinc-400 py-20">등록된 공지사항이 없습니다.</p>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {notices.map((notice, idx) => (
                <li key={notice.id}>
                  <Link
                    href={`/notice/${notice.id}`}
                    className="group flex items-center gap-5 py-6 hover:bg-zinc-50 px-4 -mx-4 rounded-xl transition-colors duration-200"
                  >
                    <span className="hidden sm:block w-10 text-center text-zinc-300 text-sm font-medium shrink-0">
                      {notices.length - idx}
                    </span>
                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                        categoryStyle[notice.category] ?? "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {notice.category}
                    </span>
                    <span className="flex-1 text-zinc-800 font-medium group-hover:text-zinc-900 truncate">
                      {notice.title}
                      {Boolean(notice.is_new) && (
                        <span className="ml-2 inline-block bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded align-middle">
                          NEW
                        </span>
                      )}
                    </span>
                    <span className="hidden sm:block shrink-0 text-zinc-400 text-sm">
                      {notice.created_at.slice(0, 10)}
                    </span>
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
          )}
        </div>
      </section>
    </>
  );
}
