"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiSearch, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import type { Product } from "@/lib/types";

const ALL = "전체";
const PAGE_SIZE = 10;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(ALL);
  const [badgeFilter, setBadgeFilter] = useState(ALL);
  const [featuredFilter, setFeaturedFilter] = useState(ALL);
  const [page, setPage] = useState(1);

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

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const badges = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.badge).filter(Boolean))) as string[]],
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== ALL && p.category !== categoryFilter) return false;
      if (badgeFilter !== ALL && p.badge !== badgeFilter) return false;
      if (featuredFilter === "추천" && !p.is_featured) return false;
      if (featuredFilter === "일반" && p.is_featured) return false;
      return true;
    });
  }, [products, search, categoryFilter, badgeFilter, featuredFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilter = search || categoryFilter !== ALL || badgeFilter !== ALL || featuredFilter !== ALL;

  function resetFilters() {
    setSearch("");
    setCategoryFilter(ALL);
    setBadgeFilter(ALL);
    setFeaturedFilter(ALL);
    setPage(1);
  }

  function handleFilterChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value);
      setPage(1);
    };
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">제품 관리</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {hasFilter ? `${filtered.length} / 총 ${products.length}개` : `총 ${products.length}개 제품`}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
        >
          <FiPlus size={16} />
          제품 추가
        </Link>
      </div>

      {/* 검색 & 필터 */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="제품명 검색"
            className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
          />
        </div>

        <FilterSelect value={categoryFilter} onChange={handleFilterChange(setCategoryFilter)} active={categoryFilter !== ALL}>
          {categories.map((c) => <option key={c} value={c}>{c === ALL ? "카테고리 전체" : c}</option>)}
        </FilterSelect>

        <FilterSelect value={badgeFilter} onChange={handleFilterChange(setBadgeFilter)} active={badgeFilter !== ALL}>
          {badges.map((b) => <option key={b} value={b}>{b === ALL ? "뱃지 전체" : b}</option>)}
        </FilterSelect>

        <FilterSelect value={featuredFilter} onChange={handleFilterChange(setFeaturedFilter)} active={featuredFilter !== ALL}>
          <option value={ALL}>추천 전체</option>
          <option value="추천">추천만</option>
          <option value="일반">일반만</option>
        </FilterSelect>

        {hasFilter && (
          <button
            onClick={resetFilters}
            className="text-xs text-zinc-400 hover:text-zinc-700 border border-zinc-200 hover:border-zinc-400 px-3 py-2 rounded-lg transition-colors"
          >
            초기화
          </button>
        )}
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
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">
          <p className="mb-3">검색 결과가 없습니다.</p>
          <button onClick={resetFilters} className="text-red-500 font-semibold hover:underline text-sm">
            필터 초기화
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="text-left px-6 py-4 font-semibold text-zinc-500">ID</th>
                  <th className="px-4 py-4"></th>
                  <th className="text-left px-6 py-4 font-semibold text-zinc-500">제품명</th>
                  <th className="text-left px-6 py-4 font-semibold text-zinc-500">카테고리</th>
                  <th className="text-left px-6 py-4 font-semibold text-zinc-500">뱃지</th>
                  <th className="text-left px-6 py-4 font-semibold text-zinc-500">추천</th>
                  <th className="text-right px-6 py-4 font-semibold text-zinc-500">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {paginated.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 text-zinc-400">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-100 shrink-0 flex items-center justify-center">
                        {p.image ? (
                          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                        ) : (
                          <span className="text-[8px] text-zinc-300 text-center leading-tight px-0.5">이미지 준비중</span>
                        )}
                      </div>
                    </td>
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
                        <span className="inline-flex items-center gap-1 text-amber-500 font-semibold"><FaStar size={12} /> 추천</span>
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

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}개
              </span>
              <div className="flex items-center gap-1">
                <PageBtn onClick={() => setPage(1)} disabled={page === 1}><FiChevronsLeft size={14} /></PageBtn>
                <PageBtn onClick={() => setPage((p) => p - 1)} disabled={page === 1}><FiChevronLeft size={14} /></PageBtn>
                {pageNumbers(page, totalPages).map((n) =>
                  n === "…" ? (
                    <span key={n + Math.random()} className="px-2 text-zinc-400">…</span>
                  ) : (
                    <PageBtn key={n} onClick={() => setPage(Number(n))} active={page === Number(n)}>
                      {n}
                    </PageBtn>
                  )
                )}
                <PageBtn onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}><FiChevronRight size={14} /></PageBtn>
                <PageBtn onClick={() => setPage(totalPages)} disabled={page === totalPages}><FiChevronsRight size={14} /></PageBtn>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

function PageBtn({
  children,
  onClick,
  disabled,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-8 h-8 px-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active
          ? "bg-red-500 text-white"
          : "border border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
      }`}
    >
      {children}
    </button>
  );
}

function FilterSelect({
  value,
  onChange,
  active,
  children,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={`appearance-none text-sm border rounded-lg pl-3 pr-9 py-2 outline-none focus:ring-2 focus:ring-red-400 transition-colors ${
          active
            ? "border-red-400 text-red-600 bg-red-50"
            : "border-zinc-200 text-zinc-600 bg-white"
        }`}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
