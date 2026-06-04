"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        setProducts(await res.json());
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

  async function handleDelete(id: number, name: string) {
    if (!confirm(`"${name}" 제품을 삭제하시겠습니까?`)) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("삭제에 실패했습니다.");
    }
  }

  useEffect(() => { loadProducts(); }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">제품 관리</h1>
          <p className="text-zinc-500 text-sm mt-1">총 {products.length}개 제품</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          제품 추가
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-zinc-400">불러오는 중...</div>
      ) : error ? null : products.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">
          <p className="mb-4">등록된 제품이 없습니다.</p>
          <Link href="/admin/products/new" className="text-red-500 font-semibold hover:underline">
            첫 제품 추가하기 →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">ID</th>
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">제품명</th>
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">카테고리</th>
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">뱃지</th>
                <th className="text-left px-6 py-4 font-semibold text-zinc-500">추천</th>
                <th className="text-right px-6 py-4 font-semibold text-zinc-500">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 text-zinc-400">{p.id}</td>
                  <td className="px-6 py-4 font-medium text-zinc-900">{p.name}</td>
                  <td className="px-6 py-4 text-zinc-500">{p.category}</td>
                  <td className="px-6 py-4">
                    {p.badge ? (
                      <span className="bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {p.badge}
                      </span>
                    ) : (
                      <span className="text-zinc-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {p.is_featured ? (
                      <span className="text-amber-500 font-semibold">★ 추천</span>
                    ) : (
                      <span className="text-zinc-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-400 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
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
