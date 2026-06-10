"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import type { Notice } from "@/lib/types";

const categoryColor: Record<string, string> = {
  공지: "bg-zinc-100 text-zinc-600",
  이벤트: "bg-red-50 text-red-500",
  제품: "bg-amber-50 text-amber-600",
};

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadNotices() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/notices");
      if (res.ok) {
        setNotices(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "데이터를 불러오지 못했습니다.");
      }
    } catch {
      setError("서버에 연결할 수 없습니다. Cloudflare D1 설정을 확인해주세요.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`"${title}" 공지사항을 삭제하시겠습니까?`)) return;
    const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
    if (res.ok) {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    } else {
      alert("삭제에 실패했습니다.");
    }
  }

  useEffect(() => { loadNotices(); }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">공지사항 관리</h1>
          <p className="text-zinc-500 text-sm mt-1">총 {notices.length}개 공지사항</p>
        </div>
        <Link
          href="/admin/notices/new"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          <FiPlus size={16} />
          공지사항 추가
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-zinc-400">불러오는 중...</div>
      ) : error ? null : notices.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">
          <p className="mb-4">등록된 공지사항이 없습니다.</p>
          <Link href="/admin/notices/new" className="text-red-500 font-semibold hover:underline">
            첫 공지사항 작성하기 <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">ID</th>
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">카테고리</th>
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">제목</th>
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">NEW</th>
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">등록일</th>
                <th className="text-right px-6 py-4 font-semibold text-zinc-500">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {notices.map((n) => (
                <tr key={n.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 text-zinc-400">{n.id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColor[n.category] ?? "bg-zinc-100 text-zinc-600"}`}>
                      {n.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900 max-w-xs truncate">
                    {n.title}
                  </td>
                  <td className="px-6 py-4">
                    {Boolean(n.is_new) ? (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                    ) : (
                      <span className="text-zinc-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    {n.created_at.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/notices/${n.id}/edit`}
                        className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-400 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(n.id, n.title)}
                        className="text-xs font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
