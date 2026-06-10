"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { PRODUCTS } from "@/lib/products";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PRODUCTS", href: "/products" },
  { label: "공지사항", href: "/notice" },
];

export default function GNB() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeSearch(); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function closeSearch() { setSearchOpen(false); setQuery(""); }

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    closeSearch();
    router.push(`/products?q=${encodeURIComponent(q)}`);
  }

  const iconColor = scrolled || menuOpen
    ? "text-gray-800 hover:text-red-500"
    : "text-white hover:text-red-400";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 md:py-5 transition-all duration-300 ${
          scrolled || menuOpen ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* 로고 */}
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/common/logo_white.png"
            alt="강산푸드 로고"
            width={100}
            height={34}
            className={`object-contain transition-all duration-300 md:w-[120px] ${
              scrolled || menuOpen ? "brightness-0" : "brightness-100"
            }`}
            priority
          />
        </Link>

        {/* 데스크톱 네비 */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-widest transition-colors ${
                scrolled ? "text-gray-800 hover:text-red-500" : "text-white hover:text-red-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="검색 열기"
            className={`transition-colors ${iconColor}`}
          >
            <FiSearch size={20} />
          </button>

          <a
            href="https://smartstore.naver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            스마트스토어
          </a>

          {/* 햄버거 버튼 — 모바일 전용 */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className={`md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 ${iconColor}`}
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col pt-20 px-8 pb-10 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col flex-1 justify-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold text-zinc-900 py-5 border-b border-zinc-100 hover:text-red-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://smartstore.naver.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center rounded-full bg-red-500 py-4 text-base font-semibold text-white hover:bg-red-600 transition-colors"
        >
          스마트스토어 바로가기
        </a>
      </div>

      {/* 검색 오버레이 */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/70 flex items-start justify-center pt-24 md:pt-32 px-4"
          onClick={closeSearch}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="제품명을 검색하세요..."
                className="w-full rounded-full bg-white px-6 py-4 pr-14 text-base text-zinc-900 placeholder-zinc-400 shadow-xl outline-none"
              />
              <button type="submit" aria-label="검색" className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-500 transition-colors">
                <FiSearch size={20} />
              </button>
            </form>

            {/* 추천 상품 (검색어 없을 때) */}
            {query.trim().length === 0 && (
              <div className="mt-2 bg-white rounded-2xl shadow-xl overflow-hidden">
                <p className="px-5 pt-4 pb-2 text-xs font-semibold text-zinc-400 tracking-widest uppercase">추천 상품</p>
                <ul>
                  {PRODUCTS.filter((p) => p.badge).map((p, i) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();
                          router.push(`/products/${p.id}`);
                        }}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-zinc-50 transition-colors ${
                          i !== 0 ? "border-t border-zinc-100" : ""
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                          <Image src={p.src} alt={p.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 truncate">{p.name}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{p.category}</p>
                        </div>
                        <span className="ml-auto shrink-0 bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {p.badge}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 검색 결과 (검색어 있을 때) */}
            {query.trim().length > 0 && (() => {
              const results = PRODUCTS.filter((p) => {
                const q = query.trim().toLowerCase();
                return (
                  p.name.toLowerCase().includes(q) ||
                  p.category.toLowerCase().includes(q) ||
                  p.tags.some((t) => t.toLowerCase().includes(q))
                );
              });
              return (
                <div className="mt-2 bg-white rounded-2xl shadow-xl overflow-hidden">
                  {results.length === 0 ? (
                    <p className="py-6 text-center text-sm text-zinc-400">검색 결과 없음</p>
                  ) : (
                    <ul>
                      {results.map((p, i) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => {
                              closeSearch();
                              router.push(`/products/${p.id}`);
                            }}
                            className={`w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-zinc-50 transition-colors ${
                              i !== 0 ? "border-t border-zinc-100" : ""
                            }`}
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                              <Image src={p.src} alt={p.name} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-zinc-900 truncate">{p.name}</p>
                              <p className="text-xs text-zinc-400 mt-0.5">{p.category}</p>
                            </div>
                            {p.badge && (
                              <span className="ml-auto shrink-0 bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                                {p.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })()}

            <p className="mt-3 text-center text-sm text-white/60">Enter로 검색 · Esc로 닫기</p>
          </div>
        </div>
      )}
    </>
  );
}
