export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { getNoticeById, getAdjacentNotices } from "@/lib/data";
import type { Notice } from "@/lib/types";

type Category = Notice["category"];

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = await getNoticeById(Number(id));
  if (!notice) return {};
  const description = notice.content.slice(0, 150).replace(/\n/g, ' ');
  return {
    title: notice.title,
    description,
    openGraph: {
      title: notice.title,
      description,
      images: notice.image ? [{ url: notice.image, alt: notice.title }] : [],
    },
    alternates: { canonical: `https://kansanfood.com/notice/${id}` },
  };
}

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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: notice.title,
    description: notice.content.slice(0, 150).replace(/\n/g, ' '),
    datePublished: notice.created_at,
    image: notice.image ? [`https://kansanfood.com${notice.image}`] : undefined,
    publisher: {
      '@type': 'Organization',
      name: '강산푸드',
      url: 'https://kansanfood.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kansanfood.com/images/common/logo_white.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="h-24 bg-zinc-900" />

      <section className="bg-white py-10 md:py-16 px-5 md:px-10">
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
            {notice.image && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10">
                <Image src={notice.image} alt={notice.title} fill className="object-cover" />
              </div>
            )}
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
                  <FiChevronUp size={12} />
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
                  <FiChevronDown size={12} />
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
